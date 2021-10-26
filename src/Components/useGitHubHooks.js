import { useState, useEffect } from 'react';

const NOT_FOUND = "Not Found";

function useGitHubHooks(username, loadingState) {

    const [{ isLoading, error }, setLoading] = useState({
      isLoading: loadingState,
      error: false,
    });
    const [userDetails, setUserDetails] = useState(null);
   
  useEffect(() => {
    if (!username.trim().length) return;
    setLoading({ isLoading: true, error: false });
 
    const fetchData = async() => {
        try {
            const result = await (
              await fetch(`https://api.github.com/users/${username}`)
            ).json();
      
            setLoading({ isLoading: false, error: false });
      
            if (result && result.hasOwnProperty("message") && result.message === NOT_FOUND ) {
              return  alert("User details does not exist")
            }
      
            setUserDetails(result);
          } catch (err) {
            setLoading({ isLoading: false, error: true });
            alert(err?.message || "Failed to get user");
          }
    }

    fetchData();

      return () => {
          
      }
  }, [username])

  return { isLoading, error, userDetails }
}

export default useGitHubHooks;