import React, { useState } from 'react';
import { Tabs, Tab, TabList,TabPanel, TabPanels } from 'carbon-components-react';
import BookingForm from '../components/form-components/form';

const HomePage = () => {
    return (
        <Tabs>
            <TabList List aria-label="Dashboard tabs">
                <Tab>Book Tickets</Tab>
                <Tab>Track Trains</Tab>
                <Tab>Track Trains</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <BookingForm />
                </TabPanel>
                <TabPanel>
                    <h1>Track Trains</h1>
                </TabPanel>
                <TabPanel>
                    <h1>Track Trains</h1>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default HomePage;