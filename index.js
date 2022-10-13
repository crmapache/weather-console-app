import colors from 'colors'

import {menu, pause, placesList, readInput} from './helpers/inquirer.js'
import { Search } from './models/Search.js'

const main = async () => {
  
  const search = new Search()
  let option = null

  do {
    option = await menu()

    switch (option) {
      case 1:
        const pattern = await readInput('Place: ')
        const places = await search.findPlace(pattern)
        const id = await placesList(places)
        
        if (id === 0) continue
  
        const place = places.find(place => place.id === id)
        const weather = await search.findWeather(place.coordinates[1], place.coordinates[0])
  
        search.addPlaceToHistory(place)
  
        if (weather) {
          console.log(`${colors.green('\nPlace:')} ${place.name}`)
          console.log(`${colors.green('Weather:')} ${weather.weather}`)
          console.log(`${colors.green('Temperature:')} ${Math.round(weather.temp)}° and feels like ${Math.round(weather.feels_like)}°`)
          if (weather.humidity) console.log(`${colors.green('Humidity:')} ${weather.humidity}%`)
          if (weather.sea_level)  console.log(`${colors.green('Sea level:')} ${weather.sea_level}m`)
        } else {
          console.log('Something went wrong')
        }
        break
      case 2:
        search.history.forEach((record, index) => {
          const idx = colors.green(`${index + 1}`)
          console.log(`${idx}. ${record.name}`)
        })
        break
    }

    if (option !== 0) await pause()
  } while (option !== 0)
}

main()
