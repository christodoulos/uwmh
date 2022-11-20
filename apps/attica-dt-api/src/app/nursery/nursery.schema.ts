import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type PNWeatherDocument = HydratedDocument<typeof PNWeatherSchema>;

export type PNWeather = typeof PNWeatherSchema;

export const PNWeatherSchema = new mongoose.Schema(
  {
    app_temp: {
      type: 'Number',
    },
    aqi: {
      type: 'Number',
    },
    city_name: {
      type: 'String',
    },
    clouds: {
      type: 'Number',
    },
    country_code: {
      type: 'String',
    },
    datetime: {
      type: 'String',
    },
    dewpt: {
      type: 'Number',
    },
    dhi: {
      type: 'Number',
    },
    dni: {
      type: 'Number',
    },
    elev_angle: {
      type: 'Number',
    },
    ghi: {
      type: 'Number',
    },
    gust: {
      type: 'Number',
    },
    h_angle: {
      type: 'Number',
    },
    lat: {
      type: 'Number',
    },
    lon: {
      type: 'Number',
    },
    ob_time: {
      type: 'String',
    },
    pod: {
      type: 'String',
    },
    precip: {
      type: 'Number',
    },
    pres: {
      type: 'Number',
    },
    rh: {
      type: 'Number',
    },
    slp: {
      type: 'Number',
    },
    snow: {
      type: 'Number',
    },
    solar_rad: {
      type: 'Number',
    },
    sources: {
      type: ['String'],
    },
    state_code: {
      type: 'String',
    },
    station: {
      type: 'String',
    },
    sunrise: {
      type: 'String',
    },
    sunset: {
      type: 'String',
    },
    temp: {
      type: 'Number',
    },
    timezone: {
      type: 'String',
    },
    ts: {
      type: 'Number',
    },
    uv: {
      type: 'Number',
    },
    vis: {
      type: 'Number',
    },
    weather: {
      icon: {
        type: 'String',
      },
      code: {
        type: 'Number',
      },
      description: {
        type: 'String',
      },
    },
    wind_cdir: {
      type: 'String',
    },
    wind_cdir_full: {
      type: 'String',
    },
    wind_dir: {
      type: 'Number',
    },
    wind_spd: {
      type: 'Number',
    },
  },
  { collection: 'plant_nursery_weatherbit' }
);
