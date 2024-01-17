function UserTable(props) {

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>createdAt</th>
            <th className='right'>controllers</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => (
            <tr key={index} id={user._id}>
              <td className='bold'>{user.name}</td>
              <td className='small'>{user.email}</td>
              <td className='small'>{new Date(user.createdAt).toLocaleString('hu-HU')}</td>
              <td className='right'>
                <i className="far fa-eye" onClick={ () => { props.handleUserInfo(user) } }></i>
                <i className="fas fa-edit" onClick={ () => { props.handleUserEditor(user) } }></i>
                <i className="fas fa-trash" onClick={ () => { props.deleteUser(user) } }></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={ () => { props.handleUserCreator() } }><i className="fas fa-plus-circle"></i> Create New User</button>
    </>
  )
}

export default UserTable;
