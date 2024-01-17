import React, { useState, useEffect } from 'react';

function UserEditor(props) {

  const [userData, setUserData] = useState({
    _id: props.selectedUser._id,
    name: props.selectedUser.name,
    email: props.selectedUser.email,
  });

  useEffect(() => {
    setUserData({
      _id: props.selectedUser._id,
      name: props.selectedUser.name,
      email: props.selectedUser.email,
    });
  }, [props.selectedUser]);


  const handleClick = () => {
    props.updateUser(userData);
  }


  return (
    <>
      <h1>Editor</h1>
      <label htmlFor="name">name</label>
      <input type="text" name="name" id="name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })}/>

      <label htmlFor="email">email</label>
      <input type="text" name="email"id="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })}/>

      <button type="button" onClick={handleClick}><i className="fas fa-plus-circle"></i> Update</button>
    </>
  )
}
  
export default UserEditor;
  