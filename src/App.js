import './App.css';
import { useEffect, useState } from 'react';
import GuestListInput from './GuestListInput';
import Header from './Header';

function App() {
  // Fetching the data from guest list API
  const [userData, setUserData] = useState();
  const baseUrl = 'http://localhost:5000';

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`${baseUrl}/`);
      setUserData(await response.json());
    }
    fetchUserData();
  }, []);

  // Elements for GuestListInput.js
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // onChange EventHandler
  const handleFirstNameChange = (event) =>
    setFirstName(event.currentTarget.value);
  const handleLastNameChange = (event) =>
    setLastName(event.currentTarget.value);
  // Add Button EventHandler

  const addGuest = (firstName) => {
    let copy = [...userData];
    copy = [...userData, firstName];
    console.log(copy);
    setUserData(copy);
  };

  const handleAddClick = () => {
    addGuest(firstName);
    setFirstName('');
  };

  return (
    <div>
      <Header />
      <GuestListInput
        firstName={firstName}
        lastName={lastName}
        handleFirstNameChange={handleFirstNameChange}
        handleLastNameChange={handleLastNameChange}
        handleAddClick={handleAddClick}
      />
      <ul>
        {userData.map((guest) => (
          <li key={userData.id}>{guest}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
