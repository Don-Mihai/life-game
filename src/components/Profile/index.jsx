import React from 'react';

import { useSelector } from 'react-redux';

import './Profile.scss';

const Profile = React.memo(() => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="profile">
      <div className="profile__avatar">
        <img src="https://i.gifer.com/origin/db/db773ee4aa154ea4f2cab588cff0ef9f_w200.gif" alt="User Avatar" className="profile__avatar-image" />
      </div>
      <div className="profile__info">
        <div className="profile__item">{user.firstName}</div>
      </div>
    </div>
  );
});

export default Profile;
