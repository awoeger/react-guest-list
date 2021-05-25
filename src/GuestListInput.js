import './FontawesomeIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function GuestListInput({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  handleAddClick,
}) {
  return (
    <form>
      <h1>GUESTIFY YOUR EVENT</h1>
      <h2>Enter guests</h2>
      <div className="InputDiv">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          placeholder="Karl"
          value={firstName}
          onChange={handleFirstNameChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          placeholder="McKarlson"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <button className="addButton" onClick={handleAddClick} type="submit">
          <FontAwesomeIcon icon="plus" color="white" />
        </button>
      </div>
    </form>
  );
}
