import StormIcon from "./icons/StormIcon";

const weatherIcons = {
    '1000': <StormIcon />,
    '1003': <StormIcon />,
    '1006': <StormIcon />,
    '1009': <StormIcon />,
    '1030': <StormIcon />,
    '1063': <StormIcon />,
    '1066': <StormIcon />,
    '1069': <StormIcon />,
    '1072': <StormIcon />,
    '1087': <StormIcon />,
    '1114': <StormIcon />,
    '1117': <StormIcon />,
    '1135': <StormIcon />,
    '1147': <StormIcon />,
    '1150': <StormIcon />,
    '1153': <StormIcon />,
    '1168': <StormIcon />,
    '1171': <StormIcon />,
    '1180': <StormIcon />,
    '1183': <StormIcon />,
    '1186': <StormIcon />,
    '1189': <StormIcon />,
    '1192': <StormIcon />,
    '1195': <StormIcon />,
    '1198': <StormIcon />,
    '1201': <StormIcon />,
    '1204': <StormIcon />,
    '1207': <StormIcon />,
    '1210': <StormIcon />,
    '1213': <StormIcon />,
    '1216': <StormIcon />,
    '1219': <StormIcon />,
    '1222': <StormIcon />,
    '1225': <StormIcon />,
    '1237': <StormIcon />,
    '1240': <StormIcon />,
    '1243': <StormIcon />,
    '1246': <StormIcon />,
    '1249': <StormIcon />,
    '1252': <StormIcon />,
    '1255': <StormIcon />,
    '1258': <StormIcon />,
    '1261': <StormIcon />,
    '1264': <StormIcon />,
    '1273': <StormIcon />,
    '1276': <StormIcon />,
    '1279': <StormIcon />,
    '1282': <StormIcon />
} 

function getWeatherIcon(code) {
    if (!weatherIcons[code]) {
        return <StormIcon />
    }
    return weatherIcons[code]
}

export { getWeatherIcon }