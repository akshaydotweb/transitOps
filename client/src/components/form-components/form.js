import React, { useState, useEffect } from 'react';
import {
  ComboBox,
  DatePicker,
  DatePickerInput,
  Dropdown,
  Button,
  Form,
  Stack,
  InlineLoading,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer
} from '@carbon/react';

const headers = [
  { key: 'train_number', header: 'Train Number' },
  { key: 'train_name', header: 'Train Name' },
  { key: 'from_station', header: 'From' },
  { key: 'to_station', header: 'To' },
  { key: 'class', header: 'Class' },
  { key: 'date', header: 'Date' },
  { key: 'availability', header: 'Availability' }
];

const BookingForm = () => {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [matchingTrains, setMatchingTrains] = useState([]);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    travelClass: ''
  });

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('http://localhost:3001/stations');
        if (!response.ok) throw new Error('Failed to fetch stations');
        const data = await response.json();
        const stationNames = data.map(station => station.station_name);
        setStations(stationNames);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };
    fetchStations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/trains');
      const allTrains = await response.json();
      
      // Filter trains based on form criteria
      const filtered = allTrains.filter(train => 
        train.from_station === formData.from &&
        train.to_station === formData.to &&
        train.class === formData.travelClass
      );
      
      setMatchingTrains(filtered);
    } catch (error) {
      console.error('Error searching trains:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Stack gap={6}>
          <ComboBox
            id="from-station"
            titleText="From"
            items={stations}
            selectedItem={formData.from}
            onChange={({ selectedItem }) => 
              setFormData(prev => ({ ...prev, from: selectedItem }))
            }
            itemToString={(item) => item}
            placeholder="Select departure station"
            required
          />

          <ComboBox
            id="to-station"
            titleText="To"
            items={stations.filter(station => station !== formData.from)}
            selectedItem={formData.to}
            onChange={({ selectedItem }) =>
              setFormData(prev => ({ ...prev, to: selectedItem }))
            }
            itemToString={(item) => item}
            placeholder="Select arrival station"
            required
          />

          <DatePicker
            datePickerType="single"
            dateFormat="m/d/Y"
            onChange={dates => 
              setFormData(prev => ({ ...prev, departureDate: dates[0] }))
            }
          >
            <DatePickerInput
              id="departure-date"
              placeholder="MM/DD/YYYY"
              labelText="Departure Date"
              required
            />
          </DatePicker>

          <Dropdown
            id="travel-class"
            titleText="Travel Class"
            labelText="Select travel class"
            items={[
              'AC First Class',
              'AC 2 Tier', 
              'AC 3 Tier',
              'Sleeper Class'
            ]}
            selectedItem={formData.travelClass}
            onChange={({ selectedItem }) =>
              setFormData(prev => ({ ...prev, travelClass: selectedItem }))
            }
            required
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <InlineLoading description="Searching..." />
            ) : (
              'Search Trains'
            )}
          </Button>
        </Stack>
      </Form>

      {matchingTrains.length > 0 && (
        <TableContainer title="Matching Trains" style={{ marginTop: '2rem', width: '50rem' }}>
          <DataTable rows={matchingTrains} headers={headers}>
            {({ rows, headers, getHeaderProps, getRowProps }) => (
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map(header => (
                      <TableHeader key={header.key} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
        </TableContainer>
      )}
    </div>
  );
};

export default BookingForm;