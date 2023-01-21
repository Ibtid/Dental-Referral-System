import { ICommonTableQueryParams } from "../../common";

export interface ITestTableQueryParams extends ICommonTableQueryParams {
  gender: string;
  status: string;
}
