import styled from '@emotion/styled';
import { Weather } from 'service/weater-service';
import DescriptionItem from './description-item';
import { useState } from 'react';
import ChoosingCity from './choosing-city';
import GetAddress from 'service/geolocation';

interface Props {
    items: Weather;
    setCity: (x: string) => void;
    setError: (x: string) => void;
}
interface ButtonLocationProps {
    materialIcons: string;
    GetLocation: (setCity: (x: string) => void) => void;
    setCity: (x: string) => void;
}
interface WaterShowProps {
    getImage: (x: string[]) => string;
    weatherDescriptions: string[];
}

const WeatherInfo: React.FC<Props> = ({ items, setCity, setError }) => {
    const {
        cloudcover,
        humidity,
        observationTime,
        temperature,
        uvIndex,
        pressure,
        visibility,
        weatherDescriptions,
        windSpeed,
        city,
    } = items;

    const weatherDesc = [
        {
            value: `${cloudcover} %`,
            title: 'CLOUD COVER',
            material_icon: 'filter_drama',
        },
        {
            value: `${windSpeed} km/h`,
            title: 'WIND SPEED',
            material_icon: 'air',
        },
        {
            value: `${pressure} mb`,
            title: 'PRESSURE',
            material_icon: 'compress',
        },
        {
            value: `${uvIndex} of 10`,
            title: 'UV INDEX',
            material_icon: 'solar_power',
        },
        {
            value: `${visibility} %`,
            title: 'VISIBILITY',
            material_icon: 'visibility',
        },
        {
            value: `${humidity} %`,
            title: 'HUMIDITY',
            material_icon: 'water_drop',
        },
    ];

    const [chooseCity, setChooseCity] = useState(false);

    const getImage = (weatherDescriptions: string[]) => {
        switch (weatherDescriptions[0].toLowerCase()) {
            case 'sunny':
                return 'sunny';
            case 'cloud':
                return 'cloud';
            case 'overcast':
                return 'cloud';
            case 'fog':
                return 'foggy';
            case 'blizzard':
                return 'snowing';
            case 'moderate rain':
                return 'water_drop';
            default:
                return 'thermostat';
        }
    };

    const GetLocation = (setCity: (x: string) => void) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                GetAddress(position.coords.latitude, position.coords.longitude)
                    .then((res) => {
                        setCity(res.city);
                        localStorage.setItem('location', res.city);
                        localStorage.setItem('city', res.city);
                    })
                    .catch(() =>
                        setError(`Location detection service is unavailable`)
                    );
            });
        }
    };

    return (
        <>
            <HeaderContainer>
                <Location>Weather Today In</Location>
                <ButtonsContainer>
                    <ButtonsCityContainer>
                        <NameCity onClick={() => setChooseCity(!chooseCity)}>
                            {city}
                        </NameCity>
                    </ButtonsCityContainer>
                    <ButtonLocationContainer>
                        <ButtonLocationComponent
                            materialIcons={'room'}
                            GetLocation={GetLocation}
                            setCity={setCity}
                        />
                    </ButtonLocationContainer>
                </ButtonsContainer>
                <WeatherInfoContainer>
                    <WeaterTypeContainer>
                        <WaterShowComponent
                            getImage={getImage}
                            weatherDescriptions={weatherDescriptions}
                        />
                        <WeatherType>{weatherDescriptions}</WeatherType>
                    </WeaterTypeContainer>
                    <WeatherTemperatureContainer>
                        <Time>as of {observationTime}</Time>
                        <Temperature>{temperature}°</Temperature>
                    </WeatherTemperatureContainer>
                </WeatherInfoContainer>
                <WeatherDescription>
                    {weatherDesc.map((el) => (
                        <DescriptionItem
                            key={el.title}
                            material_icon={el.material_icon}
                            value={el.value}
                            title={el.title}
                        />
                    ))}
                </WeatherDescription>
                <ChoosingCity
                    setCity={setCity}
                    setChooseCity={setChooseCity}
                    chooseCity={chooseCity}
                />
            </HeaderContainer>
        </>
    );
};

const ButtonLocationComponent: React.FC<ButtonLocationProps> = ({
    materialIcons,
    GetLocation,
    setCity,
}) => (
    <ButtonLocation
        className={'material-icons'}
        onClick={() => {
            GetLocation(setCity);
        }}
    >
        {materialIcons}
    </ButtonLocation>
);

const WaterShowComponent: React.FC<WaterShowProps> = ({
    getImage,
    weatherDescriptions,
}) => (
    <WaterShow className={`material-icons ${getImage(weatherDescriptions)}`}>
        {getImage(weatherDescriptions)}
    </WaterShow>
);

const HeaderContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;

    .thermostat {
        color: #7aeef6;
        animation-name: rotation1;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-direction: alternate;
        @keyframes rotation1 {
            0% {
                transform: rotate(-10deg);
            }
            100% {
                transform: rotate(10deg);
            }
        }
    }

    .water_drop {
        color: #0de7fb;
        animation-name: slideY;
        animation-duration: 0.2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-direction: alternate;
        @keyframes slideY {
            0% {
                transform: translateY(0%);
            }
            100% {
                transform: translateY(3%);
            }
        }
    }

    .snowing {
        color: white;
        animation-name: slideY;
        animation-duration: 0.2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-direction: alternate;
        @keyframes slideY {
            0% {
                transform: translateY(0%);
            }
            100% {
                transform: translateY(3%);
            }
        }
    }

    .cloud {
        color: #08bdff;
        animation-name: slide;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-direction: alternate;
        @keyframes slide {
            0% {
                transform: translate(0%);
            }
            100% {
                transform: translate(5%);
            }
        }
    }
    .foggy {
        color: lightgrey;
        animation-name: slide;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-direction: alternate;
        @keyframes slide {
            0% {
                transform: translate(0%);
            }
            100% {
                transform: translate(5%);
            }
        }
    }

    .sunny {
        color: yellow;
        animation-name: rotation;
        animation-duration: 5s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
`;

const WaterShow = styled.span`
    font-size: 4rem;
    width: 100%;
    text-align: center;
`;

const WeatherDescription = styled.div`
    width: 80%;
    min-height: 80%;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #844a87;
    background-color: white;
    border-radius: 14px;
    box-shadow: 0px 2px 8px 0px #6e6b6b;
    flex-wrap: wrap;
    display: flex;
`;

const WeatherType = styled.div`
    width: 100%;
    color: white;
    font-size: 1.3rem;
    text-align: center;
    word-break: break-word;
`;

const Temperature = styled.div`
    width: 70%;
    font-size: 4rem;
    color: #844a87;
    float: right;
    text-align: center;
    font-weight: 600;
`;

const ButtonLocation = styled.button`
    float: right;
    margin-right: 20px;
    cursor: pointer;
    padding: 7px 7px;
    background-color: #844a87;
    border-radius: 12px;
    color: white;
    font-size: 1.5em;
    margin-bottom: 10px;
    border: none;
    outline: none;
`;

const WeatherTemperatureContainer = styled.div`
    width: 50%;
    display: block;
`;

const WeaterTypeContainer = styled.div`
    width: 50%;
`;

const ButtonLocationContainer = styled.div`
    width: 40%;
    display: block;
`;

const Time = styled.div`
    color: #844a87;
    width: 70%;
    float: right;
    text-align: center;
    font-weight: 600;
`;

const NameCity = styled.button`
    cursor: pointer;
    background-color: #844a87;
    border-radius: 12px;
    padding: 5px 10px;
    color: white;
    font-size: 1.5em;
    margin-bottom: 10px;
`;

const ButtonsContainer = styled.div`
    display: flex;
`;

const ButtonsCityContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 60%;
    max-width: 60%;
    align-items: center;
    word-break: break-all;
`;

const WeatherInfoContainer = styled.div`
    display: flex;
`;

const Location = styled.div`
    margin-top: 20px;
    color: white;
    font-size: 0.8em;
    max-width: 60%;
    text-align: center;
`;

export default WeatherInfo;
