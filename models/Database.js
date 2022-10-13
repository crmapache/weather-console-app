import * as fs from "fs";

export class Database {
  db = {}
  
  constructor() {
    try {
      this.db = JSON.parse(fs.readFileSync('db.json') || '')
    } catch (e) {
      this.db = {}
    }
  }
  
  write(key, payload) {
    this.db[key] = payload
    fs.writeFileSync('db.json', JSON.stringify(this.db))
  }
  
  read(key) {
    return this.db[key]
  }
}
