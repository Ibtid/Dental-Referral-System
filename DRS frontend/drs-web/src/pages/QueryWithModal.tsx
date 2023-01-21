import { FC, Fragment } from "react";
import DemoQuery from "../components/DemoQuery";

const QueryWithModalPage: FC = () => {
  return (
    <Fragment>
      <p>QueryWithModal</p>
      <DemoQuery value="hi there" />
    </Fragment>
  );
};

export default QueryWithModalPage;
