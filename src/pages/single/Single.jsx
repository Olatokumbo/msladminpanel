import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export const Single = (inputs) => {
  console.log(inputs.dbtype[0].type);

  const UserId = () => {
    const params = useParams();

    return params.userId;
  };

  const handleRead = async () => {
    const docRef = doc(db, inputs.dbtype[0].type, UserId());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className="single">
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
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">09171234567</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">BGC, Taguig</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <h1 className="title">Membership</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">Standart</h1>
                <div className="detailItem">
                  <span className="itemKey">Facials</span>
                  <span className="itemValue">5</span>
                  <> / </>
                  <span className="itemValue">12</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">RF</span>
                  <span className="itemValue">5</span>
                  <> / </>
                  <span className="itemValue">12</span>
                </div>
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

export default Single;
