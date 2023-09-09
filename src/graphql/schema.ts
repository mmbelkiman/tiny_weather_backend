import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
    getWeather(cityName: String!): Weather
  }

  type Weather {
    coord: Coord
    weather: WeatherDescription
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
