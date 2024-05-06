import React from "react";
//import "../styles/Note.css"

function Setting({ setting, onDelete }) {

  return (
    <div className="setting-container">
      <p className="setting-name">{setting.name}</p>
      <p className="setting-bio">{setting.bio}</p>
      <p className="setting-gender">{setting.gender}</p>
      <p className="setting-sex">{setting.sex}</p>
      <p className="setting-username">{setting.username}</p>
      <p className="setting-email">{setting.email}</p>
      <button className="delete-button" onClick={() => onDelete(setting.id)}>
        Delete
      </button>
    </div>
  );
}

export default Setting;
