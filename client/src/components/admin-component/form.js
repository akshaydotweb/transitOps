import React, { useState, useEffect } from 'react';
import { 
  ComboBox, 
  DatePicker, 
  DatePickerInput, 
  Dropdown, 
  Button, 
  InlineLoading, 
  Form, 
  FormGroup, 
  TextInput 
} from '@carbon/react';

const AddTrainForm = () => {
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({
    train_number: '',
    train_name: '',
    from_station: '',
    to_station: '',
    class: '',
    date: '',
    availability: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://localhost:3001/stationNames');
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
    setFormData({ ...formData, [name]: value });
  };

  const handleComboBoxChange = (name, selectedItem) => {
    setFormData(prev => ({ ...prev, [name]: selectedItem }));
  };

  const handleDateChange = (dates) => {
    if (dates && dates[0]) {
      const formattedDate = dates[0].toISOString().split('T')[0]; // YYYY-MM-DD
      setFormData(prev => ({ ...prev, date: formattedDate }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    // Basic validation
    const { train_number, train_name, from_station, to_station, class: travelClass, date, availability } = formData;
    if (!train_number || !train_name || !from_station || !to_station || !travelClass || !date || availability === '') {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    // Ensure availability is a number
    if (isNaN(availability)) {
      setError('Availability must be a number.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/trains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          train_number,
          train_name,
          from_station,
          to_station,
          class: travelClass,
          date,
          availability: parseInt(availability, 10)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add train');
      }

      const result = await response.json();
      setSuccessMessage('Train added successfully!');
      setFormData({
        train_number: '',
        train_name: '',
        from_station: '',
        to_station: '',
        class: '',
        date: '',
        availability: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to add train');
      console.error('Error adding train:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup legendText="Add a New Train">
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green', marginBottom: '1rem' }}>{successMessage}</div>}

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
          name="from_station"
          titleText="From Station"
          items={stations}
          selectedItem={formData.from_station}
          onChange={({ selectedItem }) => handleComboBoxChange('from_station', selectedItem)}
          placeholder="Select departure station"
          required
        />

        <ComboBox
          id="to-station"
          name="to_station"
          titleText="To Station"
          items={stations.filter(s => s !== formData.from_station)}
          selectedItem={formData.to_station}
          onChange={({ selectedItem }) => handleComboBoxChange('to_station', selectedItem)}
          placeholder="Select destination station"
          required
        />

        <DatePicker
          datePickerType="single"
          dateFormat="Y-m-d"
          minDate={new Date()}
          onChange={handleDateChange}
        >
          <DatePickerInput
            id="departure-date"
            placeholder="YYYY-MM-DD"
            labelText="Departure Date"
            required
          />
        </DatePicker>

        <Dropdown
          id="travel-class"
          titleText="Travel Class"
          label="Select travel class"
          items={['AC First Class', 'AC 2 Tier', 'AC 3 Tier', 'Sleeper Class']}
          selectedItem={formData.class}
          onChange={({ selectedItem }) => handleComboBoxChange('class', selectedItem)}
          placeholder="Select travel class"
          required
        />

        <TextInput
          id="availability"
          name="availability"
          labelText="Availability"
          placeholder="Enter number of available seats"
          value={formData.availability}
          onChange={handleChange}
          required
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <InlineLoading description="Adding Train..." /> : 'Add Train'}
        </Button>
      </FormGroup>
    </Form>
  );
};

export default AddTrainForm;