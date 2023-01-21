export interface IAppointmentReview {
  total: number;
  data: {
    [key: string]: number;
  };
}

export interface IDataPie {
  name: string;
  value: number;
}
