import './app.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";                                
import "primeflex/primeflex.css";

import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';


export function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}
