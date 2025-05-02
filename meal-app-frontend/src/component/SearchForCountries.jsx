import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const countries = [
  'Italy',
  'Croatian',
  'England',
  'Turkey',
  'China',
  'USA',
  'Netherlands',
  'Mexico',
];

export default function SearchForCountries({ filteredCountries, selectedCountry, setSelectedCountry }) {

  useEffect(() => {
    filteredCountries(selectedCountry);
  }, [selectedCountry, filteredCountries]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedCountry(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="country-filter-label">Filter by countries</InputLabel>
      <Select
        labelId="country-filter-label"
        id="country-filter"
        multiple
        value={selectedCountry}
        onChange={handleChange}
        input={<OutlinedInput label="Filter by countries" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {countries.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={selectedCountry?.includes(name)} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
