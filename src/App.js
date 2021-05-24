import './App.css';
import './FontawesomeIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import GuestListInput from './GuestListInput';
import Header from './Header';

function App() {
  // Elements for GuestListInput.js
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

  // ToDo: Create download... message while fetching data from server for the first time
  // !.length is not working right now, because it then shows dowloading, when list is empty as well
  // if (userData.length < 1) {
  //   console.log(userData);
  //   return <>Loading...</>;
  // ToDo: Create download... End

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

  // States and EventHandlers for Filters
  const [selector, setSelector] = useState('');

  const handleSelectChange = (event) => {
    setSelector(event.currentTarget.value);
    if (selector === 'all') {
    } else if (selector === 'Attending') {
    } else {
    }
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
                  <FontAwesomeIcon icon="trash" />
                </button>
              </li>
            );
          })}
        </ul>
        <select onChange={handleSelectChange} id="filters">
          <option value="" disabled selected hidden>
            Filter your guests
          </option>
          <option value={selector}>All</option>
          <option value={selector}>Attending</option>
          <option value={selector}>Non attending</option>
        </select>
      </form>
    </div>
  );
}

export default App;
