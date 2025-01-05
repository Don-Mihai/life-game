import React from 'react';
import { useSelector } from 'react-redux';
import Avatar, { genConfig } from 'react-nice-avatar';
import Characteristics from './Characteristics';

import './Profile.scss';

const Profile = React.memo(() => {
  const { user } = useSelector((state) => state.user);

  const config = genConfig(user.email);

  return (
    <div className="profile">
      <div className="profile__avatar">
        {/* <img src="https://i.gifer.com/origin/db/db773ee4aa154ea4f2cab588cff0ef9f_w200.gif" alt="User Avatar" className="profile__avatar-image" /> */}
        <Avatar className="profile__avatar-image" {...config} />
      </div>
      <div className="profile__info">
        <div className="profile__item">{user.firstName}</div>
        <Characteristics />
      </div>
    </div>
  );
});

Profile.displayName = 'Profile';
export default Profile;
