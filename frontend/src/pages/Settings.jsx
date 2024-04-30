import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Settings.css"

const Settings = () => {
  const [accountSettings, setAccountSettings] = useState({
    name: "",
    bio: "",
    gender: "",
    username: "",
    email: "",
    // Add other fields 
  });

  // Fetch account settings on component mount
  useEffect(() => {
    api.get("/account/settings")
      .then(response => {
        setAccountSettings(response.data);
      })
      .catch(error => {
        console.error("Error fetching account settings:", error);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    api.post("/account/settings", accountSettings)
      .then(response => {
        console.log("Account settings updated:", response.data);
      })
      .catch(error => {
        console.error("Error updating account settings:", error);
      });
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    setAccountSettings({
      ...accountSettings,
      [event.target.name]: event.target.value
    });
  };

  return (
    <body className="body">
      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-content">
            <div className="header">
              <h1 className="title">Kitchen Keeper</h1>
            </div>
            <ul className="menu">
              <li className="menu-item">
                <div className="menu-item-content">
                  <span className="menu-item-text">General</span>
                </div>
              </li>
              {/* ... other menu items ... */}
            </ul>
          </div>
        </div>
        <div className="content">
          <header className="header">
            <div className="header-left">
              <button className="header-button">Back</button>
            </div>
            <div className="header-right">
              <button className="header-button">Home</button>
              <button className="header-button">Change theme</button>
              <button className="header-button">Login</button>
            </div>
          </header>
          <main className="main">
            <div className="container">
              <div className="form-container">
                <div className="form-section">
                  <h2 className="form-title">Edit account information</h2>
                  <div className="form-field">
                    <label className="form-label" htmlFor="username">
                      Full name
                    </label>
                    <input className="form-input" id="username" type="text" placeholder="John Doe"/>
                  </div>
                  {/* ... other form fields ... */}
                  <div className="form-actions">
                    <button className="form-submit-button" type="button">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </body>
    // <body className="bg-zinc-100 font-sans leading-normal tracking-normal">
    //   <div className="flex h-screen">
          
    //     <div className="bg-zinc-800 shadow-lg h-full w-64">
    //       <div className="px-8">
    //         <div className="h-16 w-full flex items-center">
    //           <h1 className="text-white text-3xl font-semibold">Kitchen Keeper</h1>
    //         </div>
    //         <ul className="mt-12">
    //           <li className="flex w-full justify-between text-zinc-300 hover:text-zinc-500 cursor-pointer items-center mb-6">
    //             <div className="flex items-center">
    //               <span className="text-sm ml-2">General</span>
    //             </div>
    //           </li>
    //           <li className="flex w-full justify-between text-zinc-300 hover:text-zinc-500 cursor-pointer items-center mb-6">
    //             <div className="flex items-center">
    //               <span className="text-sm ml-2">Edit Account</span>
    //             </div>
    //           </li>
    //           <li className="flex w-full justify-between text-zinc-300 hover:text-zinc-500 cursor-pointer items-center mb-6">
    //             <div className="flex items-center">
    //               <span className="text-sm ml-2">Account Information</span>
    //             </div>
    //           </li>
    //           <li className="flex w-full justify-between text-zinc-300 hover:text-zinc-500 cursor-pointer items-center mb-6">
    //             <div className="flex items-center">
    //               <span className="text-sm ml-2">My Posts</span>
    //             </div>
    //           </li>
    //           <li className="flex w-full justify-between text-zinc-300 hover:text-zinc-500 cursor-pointer items-center mb-6">
    //             <div className="flex items-center">
    //               <span className="text-sm ml-2">Subscriptions</span>
    //             </div>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
  
          
    //     <div className="flex-1 flex flex-col overflow-hidden">  
    //       <header className="flex justify-between items-center p-6">
    //         <div className="flex items-center space-x-4">
    //           <button className="text-zinc-600 focus:outline-none">Back</button>
    //         </div>
    //         <div className="flex items-center space-x-4">
    //           <button className="text-zinc-600 focus:outline-none">Home</button>
    //           <button className="text-zinc-600 focus:outline-none">Change theme</button>
    //           <button className="text-zinc-600 focus:outline-none">Login</button>
    //         </div>
    //       </header>

            
    //       <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-200">
    //         <div className="container mx-auto px-6 py-8">
    //           <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    //             <div className="mb-4">
    //               <h2 className="font-bold text-xl mb-2">Edit account information</h2>
    //               <div className="mb-4">
    //                 <label className="block text-zinc-700 text-sm font-bold mb-2" htmlFor="username">
    //                   Full name
    //                 </label>
    //                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="John Doe"/>
    //               </div>
    //               <div className="mb-6">
    //                 <label className="block text-zinc-700 text-sm font-bold mb-2" htmlFor="bio">
    //                   Bio
    //                 </label>
    //                 <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" id="bio" placeholder="Tell the world about yourself..."></textarea>
    //               </div>
    //               <div className="mb-4">
    //                 <label className="block text-zinc-700 text-sm font-bold mb-2" htmlFor="sex">
    //                   Biological Sex
    //                 </label>
    //                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" id="sex" type="text" placeholder="male"/>
    //               </div>
    //               <div className="mb-4">
    //                 <label className="block text-zinc-700 text-sm font-bold mb-2" htmlFor="gender">
    //                   Gender (optional)
    //                 </label>
    //                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" id="gender" type="text" placeholder="male"/>
    //               </div>
    //               <div className="mb-4">
    //                 <label className="block text-zinc-700 text-sm font-bold mb-2" htmlFor="username">
    //                   Account username
    //                 </label>
    //                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="john_doe_1"/>
    //               </div>
    //               <div className="mb-6">
    //                 <label className="block text-zinc-700 text-sm font-bold mb-2" htmlFor="email">
    //                   Account email
    //                 </label>
    //                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="jdoe@gmail.com"/>
    //               </div>
    //               <div className="flex items-center justify-between">
    //                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
    //                   Submit
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </main>
    //     </div>
    //   </div>
    // </body>
  );
};

export default Settings;