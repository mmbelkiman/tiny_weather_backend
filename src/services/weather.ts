import axios from 'axios';
import { buildGeoApiUrl, buildWeatherApiUrl } from './utils';

export async function getWeatherData(cityName: string) {
  try {
    const coordinatesResponse = await getCoordinates(cityName);

    if (coordinatesResponse.length === 0) {
      throw new Error(`Fail to fetch coords from ${cityName}`);
    }

    const { lat, lon } = coordinatesResponse[0];

    const weatherResponse = await axios.get(buildWeatherApiUrl(lat, lon));

    return weatherResponse.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getCoordinates(
  cityName: string,
): Promise<{ lat: number; lon: number }[]> {
  try {
    const response = await axios.get(buildGeoApiUrl(cityName));

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
