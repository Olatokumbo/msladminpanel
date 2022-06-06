import "./sidebar.scss";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MSLPanel</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardOutlinedIcon className="icon" />
              <span>DashBoard</span>
            </li>
          </Link>
          <li>
            <DateRangeOutlinedIcon className="icon" />
            <span>Schedule</span>
          </li>
          <li>
            <MonetizationOnOutlinedIcon className="icon" />
            <span>Totals</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/clients" style={{ textDecoration: "none" }}>
            <li>
              <SupervisedUserCircleOutlinedIcon className="icon" />
              <span>Clients</span>
            </li>
          </Link>
          <Link to="/clientSchedules" style={{ textDecoration: "none" }}>
            <li>
              <ScheduleOutlinedIcon className="icon" />
              <span>Client Schedules</span>
            </li>
          </Link>
          <Link to="/sales" style={{ textDecoration: "none" }}>
            <li>
              <PointOfSaleIcon className="icon" />
              <span>Sales</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <Inventory2OutlinedIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/locations" style={{ textDecoration: "none" }}>
            <li>
              <BusinessOutlinedIcon className="icon" />
              <span>Locations</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li>
            <LogoutOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Sidebar;
