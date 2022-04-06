import fs from 'fs'
import { join } from 'path'

import { phaseSchema } from '../models/phase'

export class DbMethods {
  public getDB(): Array<phaseSchema> {
    const getDB = fs.readFileSync(join(__dirname, '../../db.json'), 'utf-8')
    const parseDB = JSON.parse(getDB.toString())

    return parseDB
  }

  public saveToDB(data: any) {
    fs.writeFileSync(join(__dirname, '../../db.json'), JSON.stringify(data, null, 2))
  }
}
