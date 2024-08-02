import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Profile() {
  const [state, setState] = useContext(AppContext);

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {state.user?.username}</p>
      <p>User Type: {state.user?.userType}</p>
      {/* Add form to edit profile details */}
    </div>
  );
}

export default Profile;
