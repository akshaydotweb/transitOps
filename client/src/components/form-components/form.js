import React, { useEffect, useState } from 'react';
import { DatePicker, DatePickerInput, Dropdown, Button, ComboBox } from '@carbon/react';

const BookingForm = () => {
  
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({
  from: '',
  to: '',
  departureDate: '',
  travelClass: '',
  });

  useEffect(() => {
  const fetchStations = async () => {
    try {
    const response = await fetch('http://localhost:3001/stations');
    const data = await response.json();
    const stationNames = data.map(stations => stations.station_name);
    setStations(stationNames);
    } catch (error) {
    console.error('Error fetching station names: ', error);
    }
  };

  fetchStations();
  }, []);

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name, dates) => {
  const date = dates[0]; // Assuming single date selection
  setFormData({ ...formData, [name]: date });
  };

  const handleDropdownChange = ({ selectedItem }) => {
  setFormData({ ...formData, travelClass: selectedItem });
  };

  const formatDateTime = (date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
  setFormData((prevData) => ({
    ...prevData,
    departureDate: formatDateTime(new Date(prevData.departureDate)),
    returnDate: formatDateTime(new Date(prevData.returnDate)),
  }));
  }, [formData.departureDate, formData.returnDate]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form Data:', formData);

  try {
    const response = await fetch('http://localhost:3001/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    });

    if (response.ok) {
    console.log('Form data submitted successfully');
    } else {
    console.error('Error submitting form data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  };

  const presentDate = new Date();
  const futureDate = new Date();
  futureDate.setMonth(presentDate.getMonth() + 4);

  return (
  <form onSubmit={handleSubmit}>
    <ComboBox
    id="from"
    name="from"
    titleText="From"
    items={stations}
    selectedItem={formData.from}
    onChange={({ selectedItem }) => setFormData({ ...formData, from: selectedItem })}
    placeholder="Select a station"
    required
    />
    <ComboBox
    id="to"
    name="to"
    titleText="To"
    items={stations}
    selectedItem={formData.to}
    onChange={({ selectedItem }) => setFormData({ ...formData, to: selectedItem })}
    placeholder="Select a station"
    required
    />

    <DatePicker
    dateFormat="m/d/Y"
    datePickerType="single"
    minDate={presentDate}
    maxDate={futureDate}
    onChange={(dates) => handleDateChange('departureDate', dates)}
    >
    <DatePickerInput
      id="departure-date"
      name="departureDate"
      placeholder="mm/dd/yyyy"
      labelText="Departure Date"
      onChange={handleChange}
      required
    />
    </DatePicker>
    <Dropdown
    id="travel-class"
    titleText="Travel Class"
    label="Select travel class"
    items={['2A','3A','SL', 'CC', '2S','FC', '1A','3E']}
    onChange={handleDropdownChange}
    />
    <Button type="submit">Submit</Button>
  </form>
  );
};

export default BookingForm;