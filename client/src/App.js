import './App.css';
import HomePage from './home/page';
import Navbar from './components/navBar/navbar';

import '@carbon/styles/css/styles.css';
import { Theme, Content} from '@carbon/react';
import '@carbon/styles/css/styles.css';
import { Grid, Column } from '@carbon/react';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <Grid>
        <Column span={5}>
          <Theme theme='g90'>
            <Navbar />
          </Theme>
        </Column>
        <Column span={5} className="bx--col-padding">
          <Content>
            <HomePage />
          </Content>
        </Column>
      </Grid>
    </div>
  );
}

export default App;
