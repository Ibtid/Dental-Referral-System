import ApiPaths from "../../paths/apiPaths";
import { TQueryKey } from "../../types/reactQuery";

const todoCache: TQueryKey = [{ queryPath: ApiPaths.Todo.GetAll }];

export default todoCache;
