import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type EYDAP_APN_Document = HydratedDocument<typeof EYDAP_APN_Schema>;
export type EYDAP_APN = typeof EYDAP_APN_Schema;
export const EYDAP_APN_Schema = new mongoose.Schema(
  {
    id: { type: 'Number', required: true },
    timestamp: { type: 'Date', required: true },
    total_suspended_solids: { type: 'Number', required: true },
    biochemical_oxygen_demand: { type: 'Number', required: true },
    total_nitrogen: { type: 'Number', required: true },
    ammonium: { type: 'Number', required: true },
    turbidity: { type: 'Number', required: true },
    total_carbon: { type: 'Number', required: true },
    electric_conductivity: { type: 'Number', required: true },
  },
  {
    collection: 'eydap-apn',
    // toJSON: {
    //   transform: function (_doc, ret) {
    //     ret.id = ret._id;
    //     delete ret._id;
    //   },
    // },
  }
);

export type PLCDocument = HydratedDocument<typeof PLCSchema>;

export type PLC = typeof PLCSchema;

export const PLCSchema = new mongoose.Schema(
  {
    ts: { type: 'Date' },
    col3: { type: 'Number' },
    col4: { type: 'Number' },
    col5: { type: 'Number' },
    col6: { type: 'Number' },
    col7: { type: 'Number' },
    col8: { type: 'Number' },
    col9: { type: 'Number' },
    col10: { type: 'Number' },
    col11: { type: 'Number' },
  },
  {
    collection: 'plc',
    toJSON: {
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export type PNWeatherDocument = HydratedDocument<typeof PNWeatherSchema>;

export type PNWeather = typeof PNWeatherSchema;

export const PNWeatherSchema = new mongoose.Schema(
  {
    app_temp: { type: 'Number' },
    aqi: { type: 'Number' },
    city_name: { type: 'String' },
    clouds: { type: 'Number' },
    country_code: { type: 'String' },
    datetime: { type: 'String' },
    dewpt: { type: 'Number' },
    dhi: { type: 'Number' },
    dni: { type: 'Number' },
    elev_angle: { type: 'Number' },
    ghi: { type: 'Number' },
    gust: { type: 'Number' },
    h_angle: { type: 'Number' },
    lat: { type: 'Number' },
    lon: { type: 'Number' },
    ob_time: { type: 'String' },
    pod: { type: 'String' },
    precip: { type: 'Number' },
    pres: { type: 'Number' },
    rh: { type: 'Number' },
    slp: { type: 'Number' },
    snow: { type: 'Number' },
    solar_rad: { type: 'Number' },
    sources: { type: ['String'] },
    state_code: { type: 'String' },
    station: { type: 'String' },
    sunrise: { type: 'String' },
    sunset: { type: 'String' },
    temp: { type: 'Number' },
    timezone: { type: 'String' },
    ts: { type: 'Number' },
    uv: { type: 'Number' },
    vis: { type: 'Number' },
    weather: {
      icon: { type: 'String' },
      code: { type: 'Number' },
      description: { type: 'String' },
    },
    wind_cdir: { type: 'String' },
    wind_cdir_full: { type: 'String' },
    wind_dir: { type: 'Number' },
    wind_spd: { type: 'Number' },
  },
  { collection: 'plant_nursery_weatherbit' }
);
