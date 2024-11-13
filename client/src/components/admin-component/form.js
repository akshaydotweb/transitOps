import React, { useState, useEffect } from 'react';
import {
  Form,
  TextInput,
  ComboBox,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Button,
  InlineLoading,
  Stack
} from '@carbon/react';

const AddTrainForm = ({ onTrainAdded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({
    train_number: '',
    train_name: '',
    from_station: '',
    to_station: '',
    departure_time: '',
    arrival_time: '',
    class: '',
    availability: '',
    date: ''
  });

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://localhost:3001/stations');
        if (!response.ok) throw new Error('Failed to fetch stations');
        const data = await response.json();
        const stationNames = data.map(station => station.station_name);
        setStations(stationNames);
      } catch (err) {
        setError('Error loading stations');
        console.error(err);
      }
    };

    fetchStations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (dates) => {
    if (dates && dates[0]) {
      const formattedDate = dates[0].toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: formattedDate }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/trains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add train');
      }

      const data = await response.json();
      onTrainAdded(data);
      setFormData({
        train_number: '',
        train_name: '',
        from_station: '',
        to_station: '',
        departure_time: '',
        arrival_time: '',
        class: '',
        availability: '',
        date: ''
      });
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={6}>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        
        <TextInput
          id="train-number"
          name="train_number"
          labelText="Train Number"
          placeholder="Enter train number"
          value={formData.train_number}
          onChange={handleChange}
          required
        />

        <TextInput
          id="train-name"
          name="train_name"
          labelText="Train Name"
          placeholder="Enter train name"
          value={formData.train_name}
          onChange={handleChange}
          required
        />

        <ComboBox
          id="from-station"
          titleText="From"
          items={stations}
          selectedItem={formData.from_station}
          onChange={({ selectedItem }) => 
            setFormData(prev => ({ ...prev, from_station: selectedItem }))
          }
          placeholder="Select departure station"
          required
        />

        <ComboBox
          id="to-station"
          titleText="To"
          items={stations.filter(station => station !== formData.from_station)}
          selectedItem={formData.to_station}
          onChange={({ selectedItem }) =>
            setFormData(prev => ({ ...prev, to_station: selectedItem }))
          }
          placeholder="Select arrival station"
          required
        />

        <TextInput
          id="departure-time"
          name="departure_time"
          labelText="Departure Time"
          placeholder="Enter departure time"
          value={formData.departure_time}
          onChange={handleChange}
          required
        />

        <Dropdown
          id="class"
          titleText="Travel Class"
          items={['AC First Class', 'AC 2 Tier', 'AC 3 Tier', 'Sleeper Class']}
          selectedItem={formData.class}
          onChange={({ selectedItem }) =>
            setFormData(prev => ({ ...prev, class: selectedItem }))
          }
          labelText="Select class"
          required
        />

        <TextInput
          id="availability"
          name="availability"
          labelText="Availability"
          placeholder="Enter availability"
          value={formData.availability}
          onChange={handleChange}
          required
        />

        <Button 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? (
            <InlineLoading description="Adding train..." />
          ) : (
            'Add Train'
          )}
        </Button>

        {error && (
          <div style={{ color: 'red', marginTop: '1rem' }}>
            {error}
          </div>
        )}
      </Stack>
    </Form>
  );
};

export default AddTrainForm;