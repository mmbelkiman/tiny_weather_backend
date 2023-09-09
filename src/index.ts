import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function getWeatherData(cityName: string, apiKey: string) {
  try {
    const coordinatesResponse = await getCoordinates(cityName, apiKey);

    if (coordinatesResponse.length === 0) {
      throw new Error(`Fail to fetch coords from ${cityName}`);
    }

    const { lat, lon } = coordinatesResponse[0];

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );

    return weatherResponse.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function getCoordinates(
  cityName: string,
  apiKey: string,
): Promise<{ lat: number; lon: number }[]> {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

async function startApolloServer() {
  const app = express();

  const typeDefs = gql`
    type Query {
      hello: String
      getWeather(cityName: String!): Weather
    }

    type Weather {
      coord: Coord
      weather: [WeatherDescription]
      base: String
      main: MainWeather
      visibility: Int
      wind: WindData
      clouds: CloudData
      dt: Int
      sys: SysData
      timezone: Int
      id: Int
      name: String
      cod: Int
    }

    type Coord {
      lon: Float
      lat: Float
    }

    type WeatherDescription {
      id: Int
      main: String
      description: String
      icon: String
    }

    type MainWeather {
      temp: Float
      feels_like: Float
      temp_min: Float
      temp_max: Float
      pressure: Int
      humidity: Int
      sea_level: Int
      grnd_level: Int
    }

    type WindData {
      speed: Float
      deg: Int
      gust: Float
    }

    type CloudData {
      all: Int
    }

    type SysData {
      type: Int
      id: Int
      country: String
      sunrise: Int
      sunset: Int
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'Hello, GraphQL World!',
      getWeather: async (
        _: void,
        { cityName }: { cityName: string },
        { apiKey }: { apiKey: string },
      ) => {
        const weatherData = await getWeatherData(cityName, apiKey);

        return {
          coord: {
            lon: weatherData.coord.lon,
            lat: weatherData.coord.lat,
          },
          weather: {
            id: weatherData.weather[0].id,
            main: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { apiKey: process.env.API_KEY },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🌐 http://localhost:${PORT}/graphql`);
  });
}

startApolloServer().catch((error) => {
  console.error('Error:', error);
});
