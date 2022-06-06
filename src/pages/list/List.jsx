import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { Link } from "react-router-dom";

export const List = (inputs) => {
  const dbtype = inputs.dbtype;
  const columnsData = inputs.inputs;

  console.log(dbtype);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="top">
          <div className="left"></div>
          <div className="right">
            <Link to="../new">
              <button>Add New</button>
            </Link>
          </div>
        </div>
        <div className="bottom">
          <Datatable dbtype={dbtype} columnsData={columnsData} />
        </div>
      </div>
    </div>
  );
};

export default List;
