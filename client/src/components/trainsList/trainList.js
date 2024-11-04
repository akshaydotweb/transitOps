import React, { useEffect, useState } from 'react';
import { DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';
import axios from 'axios';

const headers = [
  { key: 'train_number', header: 'Train Number' },
  { key: 'train_code', header: 'Train Code' },
  { key: 'from_station', header: 'From Station' },
  { key: 'to_station', header: 'To Station' },
  { key: 'class', header: 'Class' },
  { key: 'date', header: 'Date' },
  { key: 'availability', header: 'Availability' }
];

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trains');
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <TableContainer title="Train List" style={{ width: '50rem' }}>
      <DataTable rows={trains} headers={headers} isSortable>
        {({ rows, headers, getHeaderProps, getRowProps }) => (
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </TableContainer>
  );
};

export default TrainList;