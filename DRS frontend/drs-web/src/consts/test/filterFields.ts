import { ITableFilterFields } from "../../interfaces/common";

export const testFilterFields: ITableFilterFields[] = [
  {
    type: "select",
    label: "Gender",
    name: "gender",
    options: [
      { label: "Any", value: "" },
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    type: "select",
    label: "Status",
    name: "status",
    options: [
      { label: "Any", value: "" },
      { label: "Married", value: "married" },
      { label: "Unmarried", value: "unmarried" },
    ],
  },
];
