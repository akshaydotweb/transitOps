import './App.css';
import HomePage from './home/page';
import Navbar from './components/navBar/navbar';
import AdminPage from './components/admin-component/page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '@carbon/styles/css/styles.css';
import { Theme, Content} from '@carbon/react';
import '@carbon/styles/css/styles.css';
import { Grid, Column } from '@carbon/react';

function App() {
  return (
    <Router>
      <div className="App" style={{ padding: '20px' }}>
        <Grid>
          <Column span={5}>
            <Theme theme='g90'>
              <Navbar />
            </Theme>
          </Column>
          <Column span={5} className="bx--col-padding"
          style={{ padding: '5rem 0'}}>
            <Routes>
              <Route path="/client" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} /> 
              <Route path="*" element={<HomePage />} /> 
            </Routes>
          </Column>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
