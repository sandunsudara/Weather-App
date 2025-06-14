import {Card, CardContent, Divider, Stack, Typography, useTheme , Box} from "@mui/material";
import {
    Air as Wind,
    NightsStay as Sunset,
    Opacity as Droplets,
    Speed as Gauge,
    WbTwilight as Sunrise,
} from "@mui/icons-material";
import {blue, grey, orange, purple, red, yellow} from "@mui/material/colors";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const WeatherCard = () => {
    const theme = useTheme();
    const hourlyForecast = [
        { time: '22:00', icon: <ThunderstormIcon fontSize="large" />, temp: '29°' },
        { time: '01:00', icon: <CloudIcon fontSize="large" />, temp: '29°' },
        { time: '04:00', icon: <CloudIcon fontSize="large" />, temp: '29°' },
        { time: '07:00', icon: <CloudIcon fontSize="large" />, temp: '29°' },
        { time: '10:00', icon: <CloudIcon fontSize="large" />, temp: '29°' },
        { time: '13:00', icon: <CloudIcon fontSize="large" />, temp: '29°' },
        { time: '16:00', icon: <CloudIcon fontSize="large" />, temp: '29°' },
    ];

    return (
        <Card
            sx={{
                borderRadius: 6,
                backgroundColor: theme.palette.background.paper
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems={'center'}>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} flex={0.5}>
                        <Typography
                            variant="h5"
                            fontWeight={500}
                            gutterBottom
                            color={theme.palette.text.primary}
                        >
                            Tuesday
                        </Typography>
                        <Typography
                            variant="h2"
                            fontWeight={300}
                            color={theme.palette.text.primary}
                        >
                            29°
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 2,
                        color: "white",
                    }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Droplets sx={{fontSize: 18, color: blue[400]}}/>
                            <Typography sx={{fontSize: 12}}>Humidity 65%</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Wind sx={{fontSize: 18, color: grey[400]}}/>
                            <Typography sx={{fontSize: 12}}>Wind 12 km/h</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Gauge sx={{fontSize: 18, color: purple[400]}}/>
                            <Typography sx={{fontSize: 12}}>Pressure 1013 MB</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 2,
                        color: "white",
                    }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Sunrise sx={{fontSize: 18, color: orange[400]}}/>
                            <Typography sx={{fontSize: 12}}>Sunrise 6:24 AM</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Sunset sx={{fontSize: 18, color: orange[700]}}/>
                            <Typography sx={{fontSize: 12}}>Sunset 7:45 PM</Typography>
                        </Stack>
                    </Box>
                    <WbSunnyIcon
                        sx={{
                            fontSize: 64,
                            color: theme.palette.primary.main
                        }}
                    />
                </Box>
                <Divider sx={{mb: 1}}/>

                {/* Hourly Forecast */}
                <Stack direction="row" spacing={4} justifyContent="space-between" sx={{overflowX: 'auto'}}>
                    {hourlyForecast.map((item, index) => (
                        <Box key={index} textAlign="center">
                            <Typography variant="caption" color="textSecondary">
                                {item.time}
                            </Typography>
                            <Box mt={1} mb={1}>{item.icon}</Box>
                            <Typography variant="body2">{item.temp}</Typography>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default WeatherCard;