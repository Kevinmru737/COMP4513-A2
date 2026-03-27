import { useState, createContext } from "react";
export const AboutContext = createContext();
const AboutContextProvider = (props) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <AboutContext.Provider value={[aboutOpen, setAboutOpen]}>
      {/* Pass an object for other Context Providers*/}
      {props.children}
    </AboutContext.Provider>
  );
};

export default AboutContextProvider;
