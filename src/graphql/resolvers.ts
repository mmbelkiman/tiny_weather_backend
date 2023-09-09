import { getWeatherData } from '@/services/weather';

export const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL World!',
    getWeather: async (_: void, { cityName }: { cityName: string }) => {
      const weatherData = await getWeatherData(cityName);

      const weatherInside: {
        id: number;
        main: string | null;
        description: string | null;
        icon: string | null;
      } = weatherData.weather[0] || {
        id: '-1',
        main: null,
        description: null,
        icon: null,
      };

      return {
        coord: {
          lon: weatherData.coord.lon,
          lat: weatherData.coord.lat,
        },
        weather: {
          id: weatherInside.id,
          main: weatherInside.main,
          description: weatherInside.description,
          icon: weatherInside.icon,
        },
        base: weatherData.base,

        main: {
          temp: weatherData.main.temp,
          feels_like: weatherData.main.feels_like,
          temp_min: weatherData.main.temp_min,
          temp_max: weatherData.main.temp_max,
          pressure: weatherData.main.pressure,
          humidity: weatherData.main.humidity,
          sea_level: weatherData.main.sea_level,
          grnd_level: weatherData.main.grnd_level,
        },
        visibility: weatherData.visibility,
        wind: {
          speed: weatherData.wind.speed,
          deg: weatherData.wind.deg,
          gust: weatherData.wind.gust,
        },
        clouds: {
          all: weatherData.clouds.all,
        },
        dt: weatherData.dt,
        sys: {
          type: weatherData.sys.type,
          id: weatherData.sys.id,
          country: weatherData.sys.country,
          sunrise: weatherData.sys.sunrise,
          sunset: weatherData.sys.sunset,
        },
        timezone: weatherData.timezone,
        id: weatherData.id,
        name: weatherData.name,
        cod: weatherData.cod,
      };
    },
  },
};
