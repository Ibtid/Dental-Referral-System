import { FC, Fragment } from "react";
import { StorageAuth } from "../core/localStorage";

const LocalStoragePage: FC = () => {
  const handleAdd = () => {
    StorageAuth.accessToken = "demo";
    StorageAuth.refreshToken = "data";
  };
  const handleClear = () => {
    StorageAuth.clearAuth();
  };

  return (
    <Fragment>
      <p>LocalStorage</p>
      <button onClick={handleAdd}>add to storage</button>
      <button onClick={handleClear}>clear</button>
    </Fragment>
  );
};

export default LocalStoragePage;
