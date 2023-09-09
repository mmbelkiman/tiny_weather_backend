import config from '@/config';

export const buildWeatherApiUrl = (lat: number, lon: number) =>
  `${config.weatherApi}${config.weatherApiWeather}lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;

export const buildGeoApiUrl = (cityName: string) =>
  `${config.weatherApi}${config.weatherApiGeo}q=${cityName}&limit=5&appid=${process.env.API_KEY}`;
