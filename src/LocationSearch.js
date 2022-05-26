import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import SearchBar from "material-ui-search-bar";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


function LocationSearch() {
  const [post, setPost] = React.useState([]);
  const [location, setLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState(post);


  const handleSubmit = () => {
    var data = {
      "location": location,
      "departureDate": departureDate,
      "bookingType": "hotel",
      "duration": "7",
      "partyCompositions": [
        {
          "adults": 2,
          "childAges": [],
          "infants": 0
        }
      ]

    }
    axios.post('https://www.virginholidays.co.uk/cjs-search-api/search', data).then(res => {
      console.log("res", res.data.holidays)
      setPost(res.data.holidays);
      setLocation('');
      setDepartureDate('');
    }).catch(err => {
    });
  }
  const columns = [
    { field: 'departureDate', headerName: 'departureDate', width: 70 },
    { field: 'starRating', headerName: 'starRating', width: 130 },
    { field: 'deposit', headerName: 'deposit', width: 130 },
    {
      field: 'pricePerPerson',
      headerName: 'pricePerPerson',
      width: 180,
    },
    {
      field: 'hotelFacilities',
      headerName: 'hotelFacilities',
      width: 250,
    },
  ];
  const requestSearch = (searchedVal) => {
    console.log("post", post)
    const filteredRows = post.filter((row) => {
      console.log(searchedVal)
      return row.pricePerPerson.match(/(\d+)/)[1];
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleClear = () => {
    setPost([]);
  }
  // React.useEffect(() => {
  //   const api = axios.create({ baseURL: 'https://www.virginholidays.co.uk' })
  //   api.post('/cjs-search-api/search', {
  //     "bookingType": "hotel",
  //     "location": "orlando",
  //     "departureDate": "24-05-2022",
  //     "duration": "7",
  //     "partyCompositions": [
  //       {
  //         "adults": 2,
  //         "childAges": [],
  //         "infants": 0
  //       }
  //     ]
  //   },
  //   )
  //     .then(res => {
  //       console.log("res", res.data.holidays)
  //       setPost(res.data.holidays);
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }, []);

  // if (!post) return null;

  return (
    <>
      <div className="App">
        <div style={{ maxWidth: 350 }}>
          <div classNames="form-group">
            <label htmlFor="name">Location</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter location"
              value={location}
              onChange={e => setLocation(e.target.value)} />
          </div>
          <div classNames="form-group">
            <label htmlFor="job" className="mt-2">departureDate</label>
            <input
              type="text"
              className="form-control"
              id="departureDate"
              placeholder="Enter departureDate"
              value={departureDate}
              onChange={e => setDepartureDate(e.target.value)} />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
        >{'Submit'}</button>

        {post.length > 0 ? <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleClear}
        >{'Clear'}</button> : null}

        {/* 
  <div style={{ height: 350, width: '100%' }}>
  <DataGrid
            getRowId={(row) => row.pricePerPerson}
            rows={post}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
  </div> */}


        {/* <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
           <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}>
           </AgGridReact>
       </div> */}
        <div>

          {/* {post.map(item => (
            <li key={item.objectID}>
              <p>{item.departureDate}</p>
              <p>{item.totalPrice}</p>
              <p>{item.hotel.name}</p>
            </li>
          ))} */}
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>departureDate</TableCell>
                <TableCell>hotel</TableCell>
                <TableCell>deposit</TableCell>
                <TableCell>pricePerPerson</TableCell>
                <TableCell>starRating</TableCell>
                <TableCell>hotelFacilities</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {post.map((row) => (
                <TableRow
                  key={row.departureDate}
                >
                  <TableCell component="th" scope="row">
                    {row.departureDate}
                  </TableCell>
                  <TableCell>{row.hotel.name}</TableCell>
                  <TableCell>{row.deposit}</TableCell>
                  <TableCell>{row.pricePerPerson}</TableCell>
                  <TableCell>{row.hotel.content.starRating}</TableCell>
                  <TableCell>{row.hotel.content.hotelFacilities}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>


        </div>
      </div>
    </>
  );
}

export default LocationSearch;