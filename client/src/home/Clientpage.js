import Navbar from '../components/navBar/navbar';import { Tabs, Tab, TabList,TabPanel, TabPanels } from 'carbon-components-react';
import BookingForm from '../components/form-components/form';
import TrainList from '../components/trainsList/trainList';

import '@carbon/styles/css/styles.css';
import { Theme, Content} from '@carbon/react';
import '@carbon/styles/css/styles.css';
import { Grid, Column } from '@carbon/react';

function ClientPage() {
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
            <Tabs>
                <TabList List aria-label="Dashboard tabs">
                    <Tab>Book Tickets</Tab>
                    <Tab>Track Trains</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <BookingForm />
                    </TabPanel>
                    <TabPanel>
                        <TrainList/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
          </Content>
        </Column>
      </Grid>
    </div>
  );
}

export default ClientPage;

// <div className="App" style={{ padding: '20px' }}>
// <Grid>
//   <Column span={5}>
//     <Theme theme='g90'>
//       <Navbar />
//     </Theme>
//   </Column>
//   <Column span={5} className="bx--col-padding">
//     <Content>
//       <HomePage />
//     </Content>
//   </Column>
// </Grid>
// </div>