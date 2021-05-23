import './App.css';
import { useEffect, useState } from 'react';
import GuestListInput from './GuestListInput';
import Header from './Header';

function App() {
  // Fetching the data from guest list API
  const [userData, setUserData] = useState([]);
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

  // onChange EventHandler for Input.js
  const handleFirstNameChange = (event) =>
    setFirstName(event.currentTarget.value);
  const handleLastNameChange = (event) =>
    setLastName(event.currentTarget.value);

  // Creating a new guest
  async function createNewGuest() {
    const response = await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
  }

  const handleAddClick = () => {
    setFirstName(firstName);
    setLastName(lastName);
    createNewGuest();
  };

  //  Edit Guest
  async function editGuest(id, isAttending) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: isAttending }),
    });
    const updatedGuest = await response.json();
    console.log(updatedGuest);
  }

  const handleEditClick = (id, guestAttending) => {
    if (!guestAttending) {
      editGuest(id, true);
    } else {
      editGuest(id, false);
    }
  };

  // Delete Guest
  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    const deletedGuest = await response.json();
  }

  const handleDeleteClick = (id) => {
    deleteGuest(id);
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
      <form>
        <ul>
          {userData.map((guest) => {
            return (
              <li key={guest.id}>
                {`${guest.firstName} ${guest.lastName} ${guest.attending}`}
                <button
                  type="submit"
                  onClick={() => handleEditClick(guest.id, guest.attending)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(guest.id)}
                  type="submit"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
}

export default App;
