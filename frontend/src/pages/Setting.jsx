import React, { useState, useEffect } from "react";
import * as react from 'react';
import api from "../api";
import Setting from "../components/Setting"
import "../styles/Setting.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';

function SettingPage() {
  const [settings, setSetting] = react.useState([]);
  const [name, setName] = react.useState("");
  const [bio, setBio] = react.useState("");
  const [gender, setGender] = react.useState("");
  const [sex, setSex] = react.useState("");
  const [username, setUsername] = react.useState("");
  const [email, setEmail] = react.useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate("/logout");
  }


  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = () => {
    api
      .get("/api/settings/")
      .then((res) => res.data)
      .then((data) => {
        console.log(data)
        const { name, bio, gender, sex, username, email } = data[0];
        setName(name);
        setBio(bio);
        setGender(gender);
        setSex(sex);
        setUsername(username);
        setEmail(email);
      })
      .catch((err) => alert(err));
  };

  const deleteSetting = (id) => {
    api
      .delete(`/api/settings/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Setting deleted!");
        else alert("Failed to delete setting.");
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
        setIsEditing(false);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="settings-container"> 
      <h2></h2>
      <Box
        component="form"
        onSubmit={createSetting}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="setting-section">
          <Avatar
            alt="Haochen"
            src="https://images.unsplash.com/photo-1421790500381-fc9b5996f343?ixlib=rb-4.0.3"
            sx={{ width: 100, height: 100 }}
          />
          <TextField
            required
            id="Full_Name-required"
            label="Full Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            disabled = {!isEditing}
          />
          <TextField
            id="Bio-optional"
            label="Bio"
            value={bio}
            onChange={(event) => {
              setBio(event.target.value);
            }}
            disabled = {!isEditing}
            multiline
            rows= {2}
          />
          <TextField
            required
            id="Gender-required"
            label="Gender"
            value={gender}
            onChange={(event) => {
              setGender(event.target.value);
            }}
            disabled = {!isEditing}
          />
          <TextField
            id="Sex-optional"
            label="Sex"
            value={sex}
            onChange={(event) => {
              setSex(event.target.value);
            }}
            disabled = {!isEditing}
          />
          <TextField
            required
            id="Username-required"
            label="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            disabled = {!isEditing}
          />
          <TextField
            required
            id="Email-required"
            label="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            disabled = {!isEditing}
          />
        </div>
        <div className="button-section">
          {isEditing && <input type="submit" value="Submit"></input>}
          {!isEditing && <Button onClick={() => setIsEditing(true)}>Change</Button>}
          {!isEditing && <Button onClick={() => navigateTo()}>Log Out</Button>}
        </div>
      </Box>
  </div>
  );
}
  
export default SettingPage;