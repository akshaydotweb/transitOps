import React, { useEffect, useState } from 'react';
import { DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Pagination } from '@carbon/react';
import axios from 'axios';
import moment from 'moment';

const headers = [
  { key: 'train_number', header: 'Train Number' },
  { key: 'train_name', header: 'Train Code' },
  { key: 'from_station', header: 'From Station' },
  { key: 'to_station', header: 'To Station' },
  { key: 'class', header: 'Class' },
  { key: 'date', header: 'Date' },
  { key: 'availability', header: 'Availability' }
];

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('/api/trains');
        const formattedData = response.data.map(train => ({
          ...train,
          date: moment(train.date).format('YYYY-MM-DD')
        }));
        setTrains(formattedData);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  const handlePageChange = (event) => {
    setCurrentPage(event.page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size.pageSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTrains = trains.slice(startIndex, endIndex);

  return (
    <TableContainer title="Train List" style={{ width: '50rem' }}>
      <DataTable rows={currentTrains} headers={headers} isSortable>
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
                    <TableCell key={cell.id}>
                      {cell.info.header === 'date' ? moment(cell.value).format('YYYY-MM-DD') : cell.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
      <Pagination
        totalItems={trains.length}
        pageSize={pageSize}
        pageSizes={[10, 20, 30, 40, 50]}
        onChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        page={currentPage}
      />
    </TableContainer>
  );
};

export default TrainList;