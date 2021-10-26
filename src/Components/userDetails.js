import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGitHubHooks from "./useGitHubHooks";

const UserDetails = () => {
  const { username } = useParams();
  const { isLoading,  userDetails } = useGitHubHooks(username, true);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const URL = `https://api.github.com/users/${username}/repos`;

    const fetchData = async () => {
      try {
        const result = await (await fetch(URL)).json();
        setRepos(result);

      } catch (err) {
        alert(err?.message || "Failed to get repo");
      }
    };

    fetchData();
    return () => {};
  }, [username]);

  return (
    <div className="user-profile">
      {isLoading && <p>Loading......</p>}
      {userDetails && (
        <>
          <div className="card">
          <img
            src={ userDetails?.avatar_url ? userDetails.avatar_url : "https://gravatar.com/avatar/5148c0f8a1d6104153e63f95a417ef62?s=400&d=robohash&r=x"}
            alt="John"
            style={{ width: "100%" }}
          />
          <h1>{userDetails.name} </h1>
          <p>Total number of repos: {userDetails.public_repos}</p>

        </div>
        <div className="card">
         {repos.length > 0 && repos.map((e) => <div key={e.id} className="eachrepo"><b>{e.name}</b><p>Description: {e.description}</p></div>)}
        </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
