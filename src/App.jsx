import { useState, useEffect } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import UserTable from './components/UserTable';
import UserInfo from './components/UserInfo';
import UserEditor from './components/UserEditor';
import UserDelete from './components/UserDelete';
import UserCreator from './components/UserCreator';

function App() {

  const [fetchCounter, setFetchCounter] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [component, setComponent] = useState(<Welcome/>);

  const apiUrl = '/api/users';

  const fetchData = async (reqMethod, urlExt = '', data = null) => {
    const url = apiUrl + urlExt;
    const options = {
      method: reqMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  useEffect(() => {
      const getUsers = async () => {
        try {
          const usersResponse = await fetchData('GET');
          setUsers(usersResponse);
        } catch (error) {
          console.error('Hiba történt:', error);
        }
      };
    
      getUsers();
  }, [fetchCounter]);



  // Component handlers --------------------------------------------

  const handleUserInfo = (user) => {
    setSelectedUser(user._id);
    setComponent(<UserInfo selectedUser={user} />);
  }

  const handleUserEditor = (user) => {
    setSelectedUser(user._id);
    setComponent(<UserEditor selectedUser={user} />);
  }

  const handleUserCreator = () => {
    setComponent(<UserCreator createNewUser={createNewUser}/>);
  }


  // Fetch handlers ------------------------------------------------

  const createNewUser = async (user) => {
    try {
      const createdUser = await fetchData('POST', '', user);
      setFetchCounter(fetchCounter + 1);
      setSelectedUser(createdUser._id);
      setComponent(<UserInfo selectedUser={createdUser} />);
    } catch (error) {
      console.error('Hiba történt:', error);
    }
  }

  const deleteUser = async (user) => {
    try {
      const deletedUser = await fetchData('DELETE', `/${user._id}`);
      setFetchCounter(fetchCounter + 1);
      setSelectedUser(0);
      setComponent(<UserDelete deletedUser={deletedUser}/>);
    } catch (error) {
      console.error('Hiba történt:', error);
    }
  }

  // ---------------------------------------------------------------

  return (
    <div id="layout-grid">
      <header>Logo</header>
      <aside>
        <UserTable  users={users} 
                    handleUserInfo={handleUserInfo} 
                    handleUserEditor={handleUserEditor} 
                    deleteUser={deleteUser}
                    handleUserCreator={handleUserCreator}
        />
      </aside>

      <main>
        {component}
      </main>
    </div>
  )
}

export default App
