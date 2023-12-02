// Profile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async (userId) => {
      try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    if (id) {
      getUserById(id);
    }
  }, [id]);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div className="user-details-wrapper row container-fluid px-0 mx-0">
          <div className="col-12 col-sm-6">
            <div className="user-image">
              <img className="user-picture w-100" src={user.avatar} alt="" />
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="user-details">
              <h2 className="user-name">{`${user.first_name} ${user.last_name}`}</h2>
              <p className="user-email">{user.email}</p>
              <a className="btn btn-primary" href="../">
                Back to home
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;