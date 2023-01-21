import { FC } from 'react';
import {
  LineChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetClinicViewLineChartData } from '../../controllers/clinic';

export const ClinicLineChart: FC = () => {
  const { clinicLineChartData, isLoading } = useGetClinicViewLineChartData();

  const renderLine = () => {
    return clinicLineChartData?.body.investigationsList?.map(
      (oneInvestigation: any, index: number) => {
        return (
          <Line
            type='monotone'
            dataKey={clinicLineChartData?.body[`area${index}Key`]}
            name={oneInvestigation}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          />
        );
      }
    );
  };

  return (
    <div className='col-12 '>
      <div className='patients-survey d-flex flex-column p-3'>
        <p className='title pb-3'>Investigations survey</p>
        <div className='patients-survey-graph pt-3'>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={clinicLineChartData?.body.data}
              margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
              <XAxis dataKey={clinicLineChartData?.body.xAxisKey} />
              <YAxis />
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip />
              <Legend verticalAlign='top' height={40} />
              {renderLine()}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
