import React from 'react';

export default function GuestListInput({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  handleAddClick,
}) {
  return (
    <form>
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
      <button onClick={handleAddClick} type="submit">
        Add
      </button>
    </form>
  );
}
