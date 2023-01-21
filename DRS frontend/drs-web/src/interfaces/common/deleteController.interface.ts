export interface IDeleteController {
  pageNo: number;
  pageSize: number;
  totalCount: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
}
