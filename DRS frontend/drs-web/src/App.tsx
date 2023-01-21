import { FC, Fragment } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './core/contexts/auth';
import AppRoutes from './routes/AppRoutes';

const App: FC = () => {
  return (
    <Fragment>
      <AuthContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthContextProvider>
      <Toaster position='top-right' />
    </Fragment>
  );
};

export default App;
