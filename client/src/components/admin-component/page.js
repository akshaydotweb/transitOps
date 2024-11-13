import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanel, TabPanels, Content } from '@carbon/react';
import AddTrainForm from './form';
import TrainList from '../trainsList/trainList';

const AdminPage = () => {
    const [trains, setTrains] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrainAdded = (newTrain) => {
        setTrains(prevTrains => [...prevTrains, newTrain]);
    };

    return (
        <Content>
            <Tabs>
                <TabList aria-label="Dashboard tabs">
                    <Tab>Add Trains</Tab>
                    <Tab>Track Trains</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AddTrainForm onTrainAdded={handleTrainAdded} />
                    </TabPanel>
                    <TabPanel>
                        <TrainList trains={trains} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Content>
    );
};

export default AdminPage;