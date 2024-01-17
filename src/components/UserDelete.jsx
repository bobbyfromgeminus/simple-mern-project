function UserDelete(props) {

    return (
      <>
        <h1>User deleted successfully</h1>
        <h2>{props.deletedUser.name}</h2>
        <p>email: <b>{props.deletedUser.email}</b></p>
        <p>created at: {new Date(props.deletedUser.createdAt).toLocaleString('hu-HU')}</p>
      </>
    )
  }
  
  export default UserDelete;