import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
import { useState } from 'react';

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
  'Pasta',
  'Dessert',
  'Fish',
  'Dough',
  'Chicken',
  'Pork',
 
];

export default function FilterByCategories({filterCategories}) {
  const [category, setCategory] = useState([]);
    
  useEffect(() => {
    
      filterCategories(category);
    
  }, [category,filterCategories]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };



  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Filter by categories</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={category}
          onChange={handleChange}
          input={<OutlinedInput label="Filter by categories" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {countries.map((name) => (
         
            <MenuItem key={name} value={name}>
              <Checkbox checked={category.includes(name)} />
              <ListItemText primary={name} />
              
            </MenuItem>
            
           
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
