import { useState, createContext } from "react";
export const LoginContext = createContext();
const LoginContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      {/* Pass an object for other Context Providers*/}
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
