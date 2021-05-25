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
  const [userData, setUserData] = useState();
  const [filteredUserData, setFilteredUserData] = useState(userData);
  const baseUrl = 'http://localhost:5000';

  // const getFilteredUserData = setFilteredUserData(userData);
  console.log(filteredUserData);
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`${baseUrl}/`);
      const res = await response.json();
      setUserData(res);
      setFilteredUserData(res);
    }
    fetchUserData();
  }, []);

  if (!filteredUserData) {
    console.log(userData);
    return (
      <div
        style={{
          color: 'white',
          fontSize: '20px',
        }}
      >
        Loading...
      </div>
    );
  }

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

  // Delete All EventHandler
  const handleDeleteAllClick = () => {
    for (let i = 0; i < userData.length; i++) {
      deleteGuest(userData[i].id);
    }
  };

  return (
    <div>
      <Header />
      <div className="listOuterContainer">
        <div className="listInnerContainer">
          <GuestListInput
            firstName={firstName}
            lastName={lastName}
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            handleAddClick={handleAddClick}
          />
          <form className="guestListContainer">
            <select onChange={handleSelectChange} id="filters">
              <option value="" disabled selected hidden>
                Filter guests
              </option>
              <option value="all">All</option>
              <option value="Attending">Attending</option>
              <option value="nonAttending">Non attending</option>
            </select>
            <div>
              {filteredUserData.map((guest) => {
                return (
                  <div className="guestListInnerContainer" key={guest.id}>
                    {`${guest.firstName} ${guest.lastName}`}
                    <div className="listButtons">
                      <button
                        className={
                          guest.attending === true
                            ? 'attendingTrue'
                            : 'attendingFalse'
                        }
                        type="submit"
                        onClick={() =>
                          handleEditClick(guest.id, guest.attending)
                        }
                      >
                        {guest.attending === true ? (
                          <FontAwesomeIcon icon="check" color="white" />
                        ) : (
                          <FontAwesomeIcon icon="times" color="white" />
                        )}
                      </button>
                      <button
                        className="deleteButton"
                        onClick={() => handleDeleteClick(guest.id)}
                        type="submit"
                      >
                        <FontAwesomeIcon icon="trash" color="white" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
          <form>
            <button
              className="deleteAllButton"
              type="submit"
              onClick={handleDeleteAllClick}
            >
              Delete all
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
