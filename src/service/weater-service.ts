export interface Weather {
    cloudcover: number;
    humidity: number;
    pressure: number;
    observationTime: string;
    temperature: number;
    visibility: number;
    uvIndex: number;
    weatherDescriptions: string[];
    windSpeed: number;
    city: string;
}

export default class WeaterService {
    getCurrent = async (city: string): Promise<Weather> => {
        const res = await fetch(
            `${process.env.REACT_APP_API_BASE}/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`
        );
        if (!res.ok) {
            throw new Error(`Could not fetch, received ${res.status}`);
        }
        const data = await res.json();
        return this._transformWeather(data);
    };

    _transformWeather = (res: any): Weather => {
        return {
            cloudcover: res.current.cloudcover,
            humidity: res.current.humidity,
            observationTime: res.current.observation_time,
            temperature: res.current.temperature,
            visibility: res.current.visibility,
            uvIndex: res.current.uv_index,
            pressure: res.current.pressure,
            weatherDescriptions: res.current.weather_descriptions,
            windSpeed: res.current.wind_speed,
            city: res.location.name,
        };
    };
}
