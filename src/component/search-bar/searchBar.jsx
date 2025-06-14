import React, { useMemo, useRef, useState } from 'react';
import {
    Autocomplete,
    TextField,
    Box,
    Typography,
    Paper, Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GeoDBService from "../../service/GeoDBService.js";
import debounce from "lodash.debounce";
import ImageService from "../../service/ImageService.js";

const SearchBarWithResults = ({setSearching}) => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const abortControllerRef = useRef(null);
    const [places, setPlaces] = useState([]);

    // Debounce API call
    const debouncedGetPlace = useMemo(
        () =>
            debounce(async (value) => {
                setSearching(true);
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }
                const controller = new AbortController();
                abortControllerRef.current = controller;

                try {
                    const response = await GeoDBService.getPlace(value, controller.signal);
                    setPlaces(
                        response.data.map((item, index) => ({
                            value: item.name,
                            displayName: item.type === "CITY"
                                ? `${item.name}, ${item.country}`
                                : item.name,
                            length:index
                        }))
                    );
                } catch (e) {
                    console.log(e);
                }finally {
                    setSearching(false);
                }
            }, 500),
        []
    );

    // Handle input change for typing
    const handleInputChange = (event, value, reason) => {
        setSearchTerm(value);
        if (value && reason === "input") {
            debouncedGetPlace(value);
        }
        if (!value) {
            setPlaces([]);
        }
    };

    const getImage = async (value) => {
        try{
            console.log(value)
            const response = await ImageService.getImage(value);
            console.log(response);
        }catch(e){
            console.log(e.message)
        }
    }

    // Handle option selection
    const handleOptionChange  = (event, newValue) => {
        if (newValue) {
            getImage(newValue.value);
        }
    };

    return (
        <Box sx={{ position: 'relative', width: '90%', }}>
            <Autocomplete
                freeSolo
                options={places}
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : (option.displayName || '')
                }
                inputValue={searchTerm}
                onInputChange={handleInputChange}
                onChange={handleOptionChange}
                PaperComponent={({ children }) => (
                    <Paper
                        sx={{
                            mt: 1,
                            borderRadius: 3,
                            boxShadow: 3,
                            backgroundColor: theme.palette.background.paper,
                            maxHeight: 200,
                            overflowY: 'auto',
                        }}
                    >
                        {children}
                    </Paper>
                )}
                renderOption={(props, option) => (
                    <Box component="li" {...props} sx={{ px: 2, py: 1, cursor: 'pointer' }}>
                        <Typography>{option.displayName}</Typography>
                    </Box>
                )}
                noOptionsText="No results found"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search places or city..."
                        variant="outlined"
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '999px',
                                px: 2,
                                py: 0.5,
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.border.hover,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.border.hover,
                                },
                            },
                            '& input::placeholder': {
                                color: theme.palette.text.secondary,
                                opacity: 1,
                            },
                        }}
                    />
                )}

            />
        </Box>
    );
};

export default SearchBarWithResults;