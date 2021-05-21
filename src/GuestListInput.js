import React from 'react';

export default function GuestListInput({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  handleAddClick,
}) {
  return (
    <div>
      <input
        placeholder="First Name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <button onClick={handleAddClick} type="button">
        Add
      </button>
    </div>
  );
}
