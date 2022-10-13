import axios from 'axios'
import {Database} from "./Database.js";

export class Search {
  db = null
  history = []

  constructor() {
    this.db = new Database()
    this.history = this.db.read('history') || []
  }

  async findPlace(placeName = '') {
    try {
      const request = axios.create({
        baseURL: `${process.env.MAPBOX_ENDPOINT}${placeName}.json`,
        params: {
          'access_token': process.env.MAPBOX_TOKEN,
          'limit': 5,
          'language': 'en'
        }
      })
      const result = await request.get('')
      
      return result.data.features.map(place => ({
        id: place.id,
        name: place.place_name,
        coordinates: place.center
      }))
    } catch (error) {
      return []
    }
  }
  
  async findWeather(lat, lon) {
    try {
      const request = axios.create({
        baseURL: process.env.OPEN_WEATHER_ENDPOINT,
        params: {
          'appid': process.env.OPEN_WEATHER_TOKEN,
          'lat': lat,
          'lon': lon,
          'units': 'metric'
        }
      })
      
      const result = await request.get('')

      return {...result.data.main, weather: `${result.data.weather[0].main}`.toLowerCase()}
    } catch (error) {
      return null
    }
    
  }
  
  addPlaceToHistory(place) {
    this.history = [place, ...this.history.filter(el => el.id !== place.id)]
    this.history = this.history.slice(0, 5)
    this.db.write('history', this.history)
  }
}
