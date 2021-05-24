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
  const [filteredUserData, setFilteredUserData] = useState(userData);
  const baseUrl = 'http://localhost:5000';

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`${baseUrl}/`);
      setUserData(await response.json());
    }
    setFilteredUserData(userData);
    console.log(userData);
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
  // !Creating filteredUserData as copy of userData to not mutate userData everytime we filter
  // !From now on only use userData when working with the API, when we want to display something use filteredUserData
  // Todo: Show entire list when reloading the page

  const handleSelectChange = (event) => {
    if (event.target.value === 'Attending') {
      setFilteredUserData(userData.filter((guest) => guest.attending === true));
    } else if (event.target.value === 'nonAttending') {
      setFilteredUserData(
        userData.filter((guest) => guest.attending === false),
      );
    } else {
      setFilteredUserData(userData);
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
          {filteredUserData.map((guest) => {
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
          <option value="all">All</option>
          <option value="Attending">Attending</option>
          <option value="nonAttending">Non attending</option>
        </select>
      </form>
    </div>
  );
}

export default App;
