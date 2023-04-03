import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../App';
const Profile = () => {
  const { state } = useContext(UserContext);
  console.log(state)
  return (
    <div>
      <img src={state.pic} alt="Profile" />
      <h2>{state.name}</h2>
      <h3>{state.email}</h3>
      <h3>{state.dopeCredits}</h3>
    </div>
  )
}

export default Profile
