import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([]);

  //const url = 'http://localhost:3000/users';
  const url = '/api/users';

  async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
  }

  useEffect(() => {
      const getUsers = async () => {
        try {
          const usersResponse = await fetchData(url);
          console.log(usersResponse);
          setUsers(usersResponse);
        } catch (error) {
          console.error('Hiba történt:', error);
        }
      };
    
      getUsers();
  }, []);

  return (
    <>
      <table className="table table-sm table-striped table-dark">
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} id={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleString('hu-HU')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
