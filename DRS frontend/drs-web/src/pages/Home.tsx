import { FC, Fragment } from "react";
import { StorageAuth } from "../core/localStorage";

const HomePage: FC = () => {
  const handleLogout = () => {
    StorageAuth.clearAuth();
  };
  const isLoggedIn = !!StorageAuth.accessToken;

  return (
    <Fragment>
      <p>Welcome to kaz software!</p>
      {isLoggedIn && <button onClick={handleLogout}>logout</button>}
    </Fragment>
  );
};

export default HomePage;
