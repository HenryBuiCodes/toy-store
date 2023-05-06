import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { API, BEARER } from "../constant";
import { useEffect } from "react";
import { getToken } from "../helper/auth";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authToken = getToken();

  const fetchLoggedInUser = (token) => {
    setIsLoading(true);

    axios
      .get("http://localhost:1337/posts", {
        headers: {
          Authorization: `${BEARER} ${token}`,
        },
      })
      .then((response) => {
        // Handle success.
        console.log("Data: ", response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUser = (user) => {
    setUserData(user);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
