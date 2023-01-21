import { TableColumn } from "react-data-table-component";
import { ITest } from "../../interfaces/controllers/test";

const columns: TableColumn<ITest>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    sortField: "name",
  },
  {
    name: "Age",
    selector: (row) => row.age,
    sortable: true,
    sortField: "age",
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
    sortField: "gender",
  },
];
export default columns;
