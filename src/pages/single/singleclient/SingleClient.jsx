import "./singleclient.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams, useLocation } from "react-router-dom";
import { AddMemberDialog } from "../../../components/formdialog/addmemberdialog/AddMemberDialog";
import { AddSaleDialog } from "../../../components/formdialog/addsaledialog/AddSaleDialog";
import MembershipCard from "../../../components/detailitem/membershipcard/MembershipCard";
import SingleClientDatatable from "../../../components/datatable/singleclientdt/SingleClientDatatable";
import { saleColumns, salescname } from "../../../dbsource";

export const SingleClient = () => {
  const [clientData, setClientData] = useState([]);
  const { state } = useLocation();

  const ClientId = () => {
    const params = useParams();
    return params.clientId;
  };
  const MemberId = () => {
    if (state) {
      return state.memberId;
    }
  };

  const handleRead = () => {
    const clientDocRef = doc(db, "clients", ClientId());
    onSnapshot(clientDocRef, (doc) => {
      setClientData(doc.data());
    });
  };

  if (clientData) {
    console.log("first");
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer" onLoad={handleRead()}>
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Client Info</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/7538775/pexels-photo-7538775.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                className="itemImg"
                alt="avatar"
              ></img>
              <div className="details">
                <h1 className="itemTitle">
                  {clientData.firstName} {clientData.lastName}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Age:</span>
                  <span className="itemValue">{clientData.age}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">{clientData.sex}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{clientData.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{clientData.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Client Class:</span>
                  <span className="itemValue">{clientData.clientClass}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <h1 className="title">Membership</h1>
            <div className="item">
              <div className="details">
                {clientData.memberId === "" && (
                  <div className="itemData">
                    <h1 className="itemTitle">Not Member</h1>
                    <div className="dialogButton">
                      <AddMemberDialog
                        clientId={ClientId()}
                        title="Add Member"
                      ></AddMemberDialog>
                    </div>
                  </div>
                )}
                {clientData.memberId !== "" && (
                  <div className="cover">
                    <MembershipCard memberId={MemberId()} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="center"></div>
        <div className="bottom">
          <h1 className="title">Purchases</h1>
          <div className="item">
            <div className="addSaleButton">
              <AddSaleDialog
                clientData={clientData}
                memberId={MemberId()}
                title="Add Sale"
              />
            </div>
            <SingleClientDatatable
              dbtype={salescname}
              columnsData={saleColumns}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClient;
