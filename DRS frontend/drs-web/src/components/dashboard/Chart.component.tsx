import { FC } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  useAppointmentReview,
  usePatientSurvey,
} from '../../controllers/companyUser';
import { IDataPie } from '../../interfaces/controllers/companyUser';

export const Chart: FC = () => {
  const { patientSurvey } = usePatientSurvey();
  const { appointmentReview } = useAppointmentReview();

  const dataPie: IDataPie[] = [];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (appointmentReview?.body.data) {
    const appointmentReviewData = Object.entries(appointmentReview?.body.data!);
    appointmentReviewData.forEach((element) => {
      const dataPieObj = { name: element[0], value: element[1] };
      dataPie.push(dataPieObj);
    });
  }

  return (
    <div className='container-fluid '>
      <div className='row mb-4 '>
        <div className='col-8 '>
          <div className='patients-survey d-flex flex-column p-3'>
            <p className='title pb-3'>Patients survey</p>
            <div className='patients-survey-graph pt-3'>
              <ResponsiveContainer width='100%' height={300}>
                <AreaChart
                  data={patientSurvey?.body}
                  margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id='colorOldPatient'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id='colorNewPatient'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey='month' />
                  <YAxis />
                  <CartesianGrid strokeDasharray='3 3' />
                  <Tooltip />
                  <Legend verticalAlign='top' height={40} />
                  <Area
                    type='monotone'
                    dataKey='oldPatient'
                    name='Old Patient'
                    stroke='#8884d8'
                    fillOpacity={1}
                    fill='url(#colorOldPatient)'
                  />
                  <Area
                    type='monotone'
                    dataKey='newPatient'
                    name='New Patient'
                    stroke='#82ca9d'
                    fillOpacity={1}
                    fill='url(#colorNewPatient)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className='col-4 '>
          <div className='patients-survey d-flex flex-column p-3'>
            <p className='title pb-3'>Appointment Review</p>
            <div className='patients-survey-graph d-flex justify-content-center pt-3'>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={dataPie}
                    innerRadius={60}
                    outerRadius={100}
                    fill='#8884d8'
                    paddingAngle={5}
                    dataKey='value'
                    legendType='circle'
                    label
                  >
                    {dataPie.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
