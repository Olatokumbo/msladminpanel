import "./singleclientdatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";

export const SingleClientDatatable = (inputs) => {
  const columnsData = inputs.columnsData;
  const dbType = inputs.dbtype[0].type;
  const [data, setData] = useState([]);
  const [clientsData, setClientsData] = useState([]);

  useEffect(() => {
    // Fetch Data Once
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //     setData(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    const unsub = onSnapshot(
      collection(db, dbType),
      (snapShot) => {
        let list = [];
        let idlist = [];
        snapShot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            date: doc.data().timeStamp.toDate().toLocaleDateString(),
            ...doc.data(),
          });
          idlist.push({
            id: doc.id,
            firstName: list.firstName,
            lastName: list.lastName,
          });
        });
        setData(list);
        setClientsData(idlist);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, dbType, id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const isMember = () => {
          if (params.row.memberId) {
            return (
              <Link
                inputs={params.id}
                to={"/" + dbType + "/" + params.id}
                state={{
                  memberId: params.row.memberId,
                  clientsData: clientsData,
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">View</div>
              </Link>
            );
          } else {
            return (
              <Link
                inputs={params.id}
                to={"/" + dbType + "/" + params.id}
                state={{ clientsData: clientsData }}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">View</div>
              </Link>
            );
          }
        };
        return (
          <div className="cellAction">
            {isMember()}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        rows={data}
        columns={columnsData.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default SingleClientDatatable;
