import { useState, useEffect } from "react";
import api from "../api";
import Setting from "../components/Setting"
import "../styles/Setting.css"
//import "../styles/Home.css"

function SettingPage() {
  const [settings, setSetting] = useState([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [sex, setSex] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = () => {
    api
      .get("/api/settings/")
      .then((res) => res.data)
      .then((data) => {
        setSetting(data);
        console.log(data);
        })
      .catch((err) => alert(err));
  };

  const deleteSetting = (id) => {
    api
      .delete(`/api/settings/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Setting deleted!");
        else alert("Failed tp delete setting.");
        getSetting();
      })
      .catch((err) => alert(err));
  };

  const createSetting = (e) => {
    e.preventDefault();
    api
      .post("/api/settings/", { name, bio, gender, sex, username, email })
      .then((res) => {
        if (res.status === 201) alert("Setting created!");
        else alert("Failed to make setting.");
        getSetting();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="settings-container"> 
      <div>
        <h2>Setting</h2>
        {settings.map((setting) => (
          <div className="setting" key={setting.id}>
          <p className="setting-text">Name: {setting.name}</p>
          <p className="setting-text">Bio: {setting.bio}</p>
          <p className="setting-text">Gender: {setting.gender}</p>
          <p className="setting-text">Sex: {setting.sex}</p>
          <p className="setting-text">Username: {setting.username}</p>
          <p className="setting-text">Email: {setting.email}</p>
          <button onClick={() => deleteSetting(setting.id)}>Delete</button>
        </div>
        ))}
      </div>
      <h2>Create a Setting</h2>
      <form onSubmit={createSetting}>
        <label htmlFor="Full name">Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="Bio">Bio:</label>
        <br />
        <textarea
          id="Bio"
          name="Bio"
          required
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <label htmlFor="gender">Gender:</label>
        <br />
        <input
          type="text"
          id="gender"
          name="gender"
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="sex">Sex:</label>
        <br />
        <input
          type="text"
          id="sex"
          name="sex"
          required
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default SettingPage;
