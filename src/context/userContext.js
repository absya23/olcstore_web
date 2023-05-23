import { createContext, useContext, useReducer } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import { LOG_OUT, UPDATE_PROFILE, userReducer } from "./userReducer";

const UserContext = createContext();
function UserProvider(props) {
  const { storedValue: user, setValue: setUser } = useLocalStorage(
    "user",
    null
  );
  const [userState, dispatch] = useReducer(userReducer, { user: user });

  const updateProfile = ({
    id_user,
    username,
    name,
    email,
    address,
    phone,
  }) => {
    setUser({ id_user, username, name, email, address, phone });
    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        id_user,
        username,
        name,
        phone,
        email,
        address,
      },
    });
  };

  const logOut = () => {
    setUser(null);
    dispatch({
      type: LOG_OUT,
    });
  };

  return (
    <UserContext.Provider
      value={{ user: userState.user, updateProfile, logOut }}
      {...props}
    ></UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (typeof context === "undefined")
    throw new Error("useUser must be used within a UserProvider");
  return context;
}

export { UserProvider, useUser };
