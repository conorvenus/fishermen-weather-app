import StormIcon from "./icons/StormIcon"
import SunnyIcon from "./icons/SunnyIcon"
import PartlyCloudyIcon from "./icons/PartlyCloudyIcon"
import CloudyIcon from "./icons/CloudyIcon"
import CloudyClearIcon from "./icons/CloudyClearIcon"
import FogIcon from "./icons/FogIcon"
import RainIcon from "./icons/RainIcon"
import SnowIcon from "./icons/SnowIcon"
import SleetIcon from "./icons/SleetIcon"
import BlowingSnowIcon from "./icons/BlowingSnowIcon"
import BlizzardIcon from "./icons/BlizzardIcon"
import HailIcon from "./icons/HailIcon"

const weatherIcons = {
    '1000': <SunnyIcon />,
    '1003': <PartlyCloudyIcon />,
    '1006': <CloudyIcon />,
    '1009': <CloudyClearIcon />,
    '1030': <FogIcon />,
    '1063': <RainIcon />,
    '1066': <SnowIcon />,
    '1069': <SleetIcon />,
    '1072': <RainIcon />,
    '1087': <StormIcon />,
    '1114': <BlowingSnowIcon />,
    '1117': <BlizzardIcon />,
    '1135': <FogIcon />,
    '1147': <FogIcon />,
    '1150': <RainIcon />,
    '1153': <RainIcon />,
    '1168': <RainIcon />,
    '1171': <RainIcon />,
    '1180': <RainIcon />,
    '1183': <RainIcon />,
    '1186': <RainIcon />,
    '1189': <RainIcon />,
    '1192': <RainIcon />,
    '1195': <RainIcon />,
    '1198': <RainIcon />,
    '1201': <RainIcon />,
    '1204': <SleetIcon />,
    '1207': <SleetIcon />,
    '1210': <SnowIcon />,
    '1213': <SnowIcon />,
    '1216': <SnowIcon />,
    '1219': <SnowIcon />,
    '1222': <SnowIcon />,
    '1225': <SnowIcon />,
    '1237': <HailIcon />,
    '1240': <RainIcon />,
    '1243': <RainIcon />,
    '1246': <RainIcon />,
    '1249': <SleetIcon />,
    '1252': <SleetIcon />,
    '1255': <SnowIcon />,
    '1258': <SnowIcon />,
    '1261': <HailIcon />,
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