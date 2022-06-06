import "./location.scss";
import { SearchBarClients } from "../../components/formsui/autocomplete/SearchBarClients";
import { useState } from "react";
import AddMemberDialog from "../../components/formdialog/addmemberdialog/AddMemberDialog";
import MembershipCard from "../../components/detailitem/membershipcard/MembershipCard";

export const Location = () => {
  const [clientData, setClientData] = useState([]);
  console.log(clientData);

  return (
    <div className="location">
      <div className="locationContainer">
        <div className="topContainer">
          <SearchBarClients updateData={setClientData} />
        </div>
        {clientData.id && (
          <div>
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
                      <span className="itemValue">
                        {clientData.clientClass}
                      </span>
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
                            clientId={clientData.id}
                            title="Add Member"
                          ></AddMemberDialog>
                        </div>
                      </div>
                    )}
                    {clientData.memberId !== "" && (
                      <div className="cover">
                        <MembershipCard memberId={clientData.memberId} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;
