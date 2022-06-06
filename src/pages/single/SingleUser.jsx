import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";

export const SingleUser = (inputs) => {
  const [data, setData] = useState([]);

  const UserId = () => {
    const params = useParams();

    return params.userId;
  };

  const handleRead = () => {
    const docRef = doc(db, inputs.dbtype[0].type, UserId());
    onSnapshot(docRef, (doc) => {
      setData(doc.data());
    });
  };
  return (
    <div className="single" onLoad={handleRead()}>
      <Sidebar />
      <div className="singleContainer">
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
                  {data.firstName} {data.lastName}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <h1 className="title">Role</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{data.role}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Purchases</h1>
          <div className="item">{UserId()}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
