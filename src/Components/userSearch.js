import { useState } from "react";
import { Link } from "react-router-dom";
import useGitHubHooks from "./useGitHubHooks";

const UserSearch = () => {
    const [userNameForm, setUserNameForm] = useState("");
    const [userName, setUserName] = useState("");
    const {  isLoading, error, userDetails } = useGitHubHooks(userName, false);
  

  return (
    <div className="search-div">
      <input
       autoFocus
        type="text"
        className="searchTerm"
        placeholder="Enter a user name"
        value={userNameForm}
        onChange={(e) => setUserNameForm(e.target.value)}
      />
      <button
        onClick={() =>setUserName(userNameForm) }
        disabled={!userNameForm.trim().length}
        className="button"
      >
        Search
      </button>

      {isLoading && <p>Loading......</p>}

      {error && <p style={{ color: "red" }}>Failed to get user details</p>}

      {!isLoading && userDetails && (
        <div>
          <p>Name: {userDetails.name}</p>{" "}
          <p> Total number of repositories: {userDetails.public_repos}</p>{" "}
          <Link
            to={{
              pathname: `/${userName}`,
              state: userDetails,
            }}
          >
            View More
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
