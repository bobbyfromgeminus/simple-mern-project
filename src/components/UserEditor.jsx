function UserEditor(props) {

    return (
      <>
        <h1>Editor</h1>
        <h2>{props.selectedUser.name}</h2>
        <p>email: <b>{props.selectedUser.email}</b></p>
        <p>created at: {new Date(props.selectedUser.createdAt).toLocaleString('hu-HU')}</p>
      </>
    )
  }
  
  export default UserEditor;
  