import { useState, useEffect } from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { Log } from '@/middleware/logger';

interface FilterBarProps {
  initialLimit: number;
  initialType: string;
  onChange: (limit: number, type: string) => void;
}

export const FilterBar = ({ initialLimit, initialType, onChange }: FilterBarProps) => {
  const [limit, setLimit] = useState<string>(initialLimit.toString());
  const [type, setType] = useState<string>(initialType);

  // Debounce limit input
  useEffect(() => {
    const handler = setTimeout(() => {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        onChange(parsedLimit, type);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [limit, type, onChange]);

  const handleTypeChange = (newType: string) => {
    setType(newType);
    Log('frontend', 'info', 'component', `Filter changed: type set to ${newType}`);
  };

  const handleLimitChange = (val: string) => {
    setLimit(val);
    Log('frontend', 'debug', 'component', `Filter input changed: limit set to ${val}`);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', flexWrap: 'wrap' }}>
      <Typography variant="h6" sx={{ mr: 2 }}>Filters:</Typography>
      
      <TextField
        label="Top N"
        type="number"
        variant="outlined"
        size="small"
        value={limit}
        onChange={(e) => handleLimitChange(e.target.value)}
        sx={{ width: 120 }}
        slotProps={{ htmlInput: { min: 1 } }}
      />

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          label="Type"
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
