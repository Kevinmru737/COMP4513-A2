import { createContext, useContext, useState } from "react";

export const ToastContext = createContext();

const ToastContextProvider = (props) => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showToast = (msg, duration = 2000) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {props.children}
      {visible && (
        <div className="fixed top-18 right-12 z-60 bg-orange-300 text-black px-4 py-2 rounded shadow-lg animate-fade-in">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
