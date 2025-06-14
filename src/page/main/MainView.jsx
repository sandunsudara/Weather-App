import {Box, Button, Grid, Stack, Typography, useTheme} from "@mui/material";
import MapIcon from '@mui/icons-material/LocationOn';
import {Cloud} from 'lucide-react';
import SmallWeatherCard from "../../component/small-weather-card/smallWeatherCard.jsx";
import React, {useEffect, useState} from "react";
import {WbSunny as Sun,} from "@mui/icons-material";
import WeatherCard from "../../component/weather-card/weatherCard.jsx";
import WeatherService from "../../service/WeatherService.js";
import ImageService from "../../service/ImageService.js";


const getWeatherIcon = (condition) => {
    switch (condition) {
        case 'sunny':
            return <Sun size={32} color="#facc15"/>;
        case 'cloudy':
            return <Cloud size={32} color="#d1d5db"/>;
        default:
            return <Sun size={32} color="#facc15"/>;
    }
};


const getMainWeatherIcon = () => (
    <Box position="relative">
        <Sun size={64} color="#facc15"/>
        <Box position="absolute" right={-8} bottom={-4}>
            <Box
                sx={{
                    width: 32,
                    height: 8,
                    bgcolor: 'rgba(253, 230, 138, 0.6)',
                    borderRadius: '8px',
                    mb: 0.5
                }}
            />
            <Box
                sx={{
                    width: 24,
                    height: 4,
                    bgcolor: 'rgba(253, 230, 138, 0.4)',
                    borderRadius: '8px',
                    mb: 0.5
                }}
            />
            <Box
                sx={{
                    width: 16,
                    height: 4,
                    bgcolor: 'rgba(253, 230, 138, 0.3)',
                    borderRadius: '8px'
                }}
            />
        </Box>
    </Box>
);


const MainView = ({selectedPlace}) => {
    const theme = useTheme();
    const [selected, setSelected] = useState('Today');
    const buttons = ['Today', 'Tomorrow', 'Week'];

    const [loading, setLoading] = useState(false);
    const weeklyWeatherData = [
        {
            day: "Wednesday",
            temperature: 26,
            condition: "Sunny",
            feelsLike: 28,
            humidity: 65,
            wind: 12,
            pressure: 1013,
            sunrise: "6:24 AM",
            sunset: "7:45 PM",
        },
        {
            day: "Thursday",
            temperature: 27,
            condition: "Partly Cloudy",
            feelsLike: 29,
            humidity: 60,
            wind: 14,
            pressure: 1012,
            sunrise: "6:25 AM",
            sunset: "7:46 PM",
        },
        {
            day: "Friday",
            temperature: 25,
            condition: "Rainy",
            feelsLike: 26,
            humidity: 80,
            wind: 10,
            pressure: 1011,
            sunrise: "6:25 AM",
            sunset: "7:46 PM",
        },
        {
            day: "Saturday",
            temperature: 28,
            condition: "Sunny",
            feelsLike: 30,
            humidity: 58,
            wind: 11,
            pressure: 1014,
            sunrise: "6:26 AM",
            sunset: "7:47 PM",
        },
        {
            day: "Sunday",
            temperature: 29,
            condition: "Mostly Sunny",
            feelsLike: 31,
            humidity: 55,
            wind: 13,
            pressure: 1015,
            sunrise: "6:26 AM",
            sunset: "7:47 PM",
        },
        {
            day: "Monday",
            temperature: 24,
            condition: "Cloudy",
            feelsLike: 25,
            humidity: 70,
            wind: 15,
            pressure: 1010,
            sunrise: "6:27 AM",
            sunset: "7:48 PM",
        },
        {
            day: "Tuesday",
            temperature: 23,
            condition: "Rain Showers",
            feelsLike: 24,
            humidity: 85,
            wind: 9,
            pressure: 1009,
            sunrise: "6:27 AM",
            sunset: "7:48 PM",
        },
    ];
    const [mainWeatherData, setMainWeatherData] = useState(null)
    const [locationData, setLocationData] = useState(null)
    const [imageData, setImageData] = useState(null);

    const getImage = async () => {
        try {
            const response = await ImageService.getImage(selectedPlace.displayName);
            console.log(response.data.results[0].urls.regular);
            setImageData({
                url: response.data.results[0].urls.regular,
                name: response.data.results[0].alt_description,
            });
        } catch (e) {
            console.log(e.message)
        }
    }

    const fetchWeatherData = async () => {
        try{
            const response = await WeatherService.fetchWeatherData(selectedPlace.latitude, selectedPlace.longitude);
            setMainWeatherData(response.data.current);
            setLocationData(response.data.location);
        }catch(e){
            console.log(e.message);
        }
    }

    useEffect(() => {
        const fetchAllData = async () => {
            if (selectedPlace) {
                try {
                    await fetchWeatherData();
                    await getImage();
                } catch (error) {
                    console.log('Error in fetching data:', error.message);
                }
            }
        };

        fetchAllData();
    },[selectedPlace]);


    return (
        <Grid container width={'70%'} m={'auto'} mt={10}
              sx={{background: theme.palette.background.box, borderRadius: 5}}>
            <Grid item size={6}>
                {/* Image Section with Overlay */}
                <Box
                    sx={{
                        position: 'relative',
                        height: 256,
                        borderRadius: 6,
                        overflow: 'hidden',
                        mb: 3,
                    }}
                >
                    <img
                        src={imageData?.url}
                        alt={imageData?.name}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            p: 3,
                            width: '100%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                            color: theme.palette.primary.contrastText,
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                            <MapIcon sx={{fontSize: 16, color: theme.palette.text.primary}}/>
                            <Typography variant="body2" color={theme.palette.text.primary} textAlign="bottom"
                                        fontSize={'1.3rem'} pt={0.5} fontWeight={700}>
                                {locationData?.name}, {locationData?.region}
                            </Typography>
                        </Stack>
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.primary,
                                fontSize: '1rem',
                                opacity: 0.75,
                                ml:3
                            }}
                        >
                            Located in {locationData?.country}
                        </Typography>
                    </Box>
                </Box>

                {/* Weather Navigation */}

            </Grid>
            <Grid item size={12} display={"flex"} flexDirection={"column"} justifyContent={'center'} alignItems={'center'}>
                <Stack direction="row" spacing={2} mb={3} border={1} borderColor={theme.palette.secondary.main}
                       width={'fit-content'} borderRadius={5} p={0.5} co>
                    {buttons.map((label) => (
                        <Button
                            key={label}
                            variant={'contained'}
                            onClick={() => setSelected(label)}
                            sx={{
                                borderRadius: 999,
                                textTransform: 'none',
                                fontWeight: 600,
                                bgcolor:
                                    selected === label
                                        ? theme.palette.background.paper
                                        : 'transparent',
                                color:
                                    selected === label
                                        ? theme.palette.secondary.contrastText
                                        : theme.palette.text.secondary,
                                '&:hover': {
                                    bgcolor: selected === label ? theme.palette.secondary.main : theme.palette.background.paper,
                                },
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </Stack>

                {/* Current Weather */}

                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                    mb={3}
                    gap={2}
                    overflow="hidden"
                    justifyContent="center"
                    px={5}
                >
                    {selected === 'Week' ? (weeklyWeatherData.map((data) => (<SmallWeatherCard data={data}/>))) : (
                        <WeatherCard/>)}
                </Box>

            </Grid>


        </Grid>
    )
}

export default MainView;