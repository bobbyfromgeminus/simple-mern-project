function UserCreator(props) {

    const handleClick = () => {
      let user = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value
      }
      props.createNewUser(user);
    }

    return (
      <>
        <h1>Creator</h1>
        <label htmlFor="name">name</label>
        <input type="text" name="name" id="name"/>

        <label htmlFor="email">email</label>
        <input type="text" name="email"id="email"/>

        <button type="button" onClick={handleClick}><i className="fas fa-plus-circle"></i> Create</button>
      </>
    )
  }
  
  export default UserCreator;