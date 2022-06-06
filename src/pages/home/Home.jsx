import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import List from "../../components/table/Table";

export const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="client" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Last Sales</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
