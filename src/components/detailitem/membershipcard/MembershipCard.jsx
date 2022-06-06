import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState, useEffect } from "react";

function MembershipCard({ memberId }) {
  const [memberData, setMemberData] = useState([]);
  useEffect(() => {
    if (memberId) {
      const clientDocRef = doc(db, "members", memberId);
      onSnapshot(clientDocRef, (doc) => {
        setMemberData(doc.data());
      });
    }
  }, [memberId]);

  return (
    <div className="cover">
      <div className="top">
        <h1 className="itemTitle">{memberData.membershipType} Member</h1>
      </div>
      <div>
        <div className="detailItem">
          <span className="itemKey">Facials</span>
          <span className="itemValue">{memberData.facial}</span>
          <span className="itemValue"> / </span>
          <span className="itemValue">{memberData.facialCounter}</span>
        </div>
        <div className="detailItem">
          <span className="itemKey">Slimming</span>
          <span className="itemValue">{memberData.slimming}</span>
          <span className="itemValue"> / </span>
          <span className="itemValue">{memberData.slimmingCounter}</span>
        </div>
      </div>
    </div>
  );
}

export default MembershipCard;
