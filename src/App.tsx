import { BrowserRouter } from 'react-router-dom';
import { CvProvider } from './features/cv/context/CvContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <CvProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CvProvider>
  );
}

export default App;