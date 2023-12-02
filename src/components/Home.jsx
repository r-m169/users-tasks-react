// UsersList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [data, setData] = useState([]);

  const getUsersFromAPI = async (page) => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const userData = await response.json();
      return userData.data;
    } catch {
      console.error("cant reach the data");
    }
  };
  const generateUsers = async(targetedPage = 1)=>{
        const users = await getUsersFromAPI(targetedPage);
        setData(users)
  }
  const displayUsers = (usersData) => {
    return usersData.map((user) => (
      <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
        <div className="card h-100">
          <img
            className="card-img-top aspect-ratio-1 object-fit-cover"
            src={user.avatar}
            alt="Card cap"
          />
          <div className="card-body">
            <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
            <p className="card-text">{user.email}</p>
            <Link to={`/profile/${user.id}`} className="btn btn-primary">
              Read more
            </Link>
          </div>
        </div>
      </div>
    ));
  };
  useEffect(()=>{
    generateUsers();
  },[])
  return (
    <div>
      <h1>Users List</h1>
      <div className="users-container row container-fluid">
        {displayUsers(data)}
      </div>
      <div className="container-fluid d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => generateUsers(1)}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => generateUsers(1)}>
                1
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => generateUsers(2)}>
                2
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => generateUsers(3)}>
                3
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => generateUsers(3)}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UsersList;
