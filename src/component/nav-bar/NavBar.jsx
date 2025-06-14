import React, {useState} from 'react';
import {Box, CircularProgress, IconButton, useTheme} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchBarWithResults from "../search-bar/searchBar.jsx";


const NavBar = ({toggleColorMode ,selectedPlace ,setSelectedPlace }) => {
    const theme = useTheme();
    const [searching, setSearching] = useState(false);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
                position: 'fixed',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                py: 1,
                backgroundColor: theme.palette.background.box,
                borderRadius: 5,
                zIndex: 1000,
            }}
        >
            {searching ? (
                <CircularProgress
                    size={24}
                    sx={{color: theme.palette.text.primary, verticalAlign: 'middle' , ml:2}}
                />
            ) : (
                <SearchIcon
                    sx={{color: theme.palette.text.primary, verticalAlign: 'middle' , ml:2}}
                />
            )}
            <SearchBarWithResults setSearching={setSearching} selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />
            <IconButton
                onClick={toggleColorMode}
                sx={{
                    p: 1,
                    color: theme.palette.text.primary,
                    '&:hover': {
                        bgcolor: theme.palette.secondary.main
                    }
                }}
            >
                {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
            </IconButton>
        </Box>
    );
}

export default NavBar;