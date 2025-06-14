import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import { blue, grey, orange, purple, red, yellow } from "@mui/material/colors";
import {
    Air as Wind,
    NightsStay as Sunset,
    Opacity as Droplets,
    Speed as Gauge,
    Thermostat as Thermometer,
    WbSunny as Sun,
    WbTwilight as Sunrise,
} from "@mui/icons-material";
import { useTheme } from "@mui/material";

// Accept props: data object
const SmallWeatherCard = ({ data }) => {
    const [hovered, setHovered] = useState(false);
    const theme = useTheme();

    const getMainWeatherIcon = () => (
        <Box sx={{ position: "relative", display: "inline-block" }}>
            <Sun sx={{ fontSize: 48, color: yellow[700] }} />
            <Box
                sx={{
                    position: "absolute",
                    right: -24,
                    bottom: -4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                }}
            >
                <Box
                    sx={{
                        width: 32,
                        height: 8,
                        bgcolor: yellow[200],
                        opacity: 0.6,
                        borderRadius: 8,
                    }}
                />
                <Box
                    sx={{
                        width: 24,
                        height: 4,
                        bgcolor: yellow[100],
                        opacity: 0.4,
                        borderRadius: 8,
                    }}
                />
                <Box
                    sx={{
                        width: 16,
                        height: 4,
                        bgcolor: yellow[50],
                        opacity: 0.3,
                        borderRadius: 8,
                    }}
                />
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{ display: "inline-block", cursor: "pointer" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Paper
                sx={{
                    m: 0,
                    boxShadow: 0,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 4,
                    background: theme.palette.background.paper,
                    transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
                    width: hovered ? 300 : 144,
                    height: 260,
                }}
            >
                <Stack direction="row" height="100%">
                    {/* Main Weather Section */}
                    <Box
                        sx={{
                            flex: "0 0 auto",
                            width: hovered ? 144 : "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
                        }}
                    >
                        <Box
                            sx={{
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                color="white"
                                sx={{ opacity: 0.8, fontSize: 14, fontWeight: 300 }}
                            >
                                {data?.day}
                            </Typography>
                            <Typography
                                color="white"
                                sx={{ fontSize: 32, fontWeight: 200, lineHeight: 1 }}
                            >
                                {data?.temperature}°
                            </Typography>
                            {getMainWeatherIcon()}
                            <Typography
                                color="white"
                                sx={{ opacity: 0.6, fontSize: 12, fontWeight: 400 }}
                            >
                                {data?.condition}
                            </Typography>
                        </Box>
                    </Box>
                    {/* Details Section */}
                    <Fade in={hovered} timeout={500} style={{ transitionDelay: hovered ? "200ms" : "0ms" }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flex: 1,
                                opacity: hovered ? 1 : 0,
                                transform: hovered ? "translateX(0)" : "translateX(16px)",
                                transition:
                                    "opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1)",
                                pointerEvents: hovered ? "auto" : "none",
                                width: hovered ? "100px" : 0,
                            }}
                        >
                            <Fade in={hovered} timeout={300}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    gap: 2,
                                    color: "white",
                                }}>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <Thermometer sx={{ fontSize: 18, color: red[400] }} />
                                        <Typography sx={{ fontSize: 12 }}>
                                            Feels like {data?.feelsLike}°
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <Droplets sx={{ fontSize: 18, color: blue[400] }} />
                                        <Typography sx={{ fontSize: 12 }}>
                                            Humidity {data?.humidity}%
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <Wind sx={{ fontSize: 18, color: grey[400] }} />
                                        <Typography sx={{ fontSize: 12 }}>
                                            Wind {data?.wind} km/h
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <Gauge sx={{ fontSize: 18, color: purple[400] }} />
                                        <Typography sx={{ fontSize: 12 }}>
                                            Pressure {data?.pressure} MB
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <Sunrise sx={{ fontSize: 18, color: orange[400] }} />
                                        <Typography sx={{ fontSize: 12 }}>
                                            Sunrise {data?.sunrise}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <Sunset sx={{ fontSize: 18, color: orange[700] }} />
                                        <Typography sx={{ fontSize: 12 }}>
                                            Sunset {data?.sunset}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Fade>
                        </Box>
                    </Fade>
                </Stack>
            </Paper>
        </Box>
    );
};

export default SmallWeatherCard;