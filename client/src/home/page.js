import React, { useState } from 'react';
import { Tabs, Tab, TabList,TabPanel, TabPanels } from 'carbon-components-react';
import BookingForm from '../components/form-components/form';
import TrainList from '../components/trainsList/trainList';

const HomePage = () => {
    return (
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
    );
};

export default HomePage;