function UserInfo(props) {

    return (
      <>
        <h1>User Data</h1>
        <h2>{props.selectedUser.name}</h2>
        <p>email: <b>{props.selectedUser.email}</b></p>
        <p>created at: {new Date(props.selectedUser.createdAt).toLocaleString('hu-HU')}</p>
      </>
    )
  }
  
  export default UserInfo;
  