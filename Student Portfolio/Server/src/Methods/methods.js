import {v4 as uniqueId} from 'uuid'
import fs from 'fs'
import path from 'path'

const createId = uniqueId()

//PATH AND ARRAYS INITIALIZED
const __dirname = path.resolve()
const studentsPath = path.join(__dirname, './src/Data/students.json')
const readPath = fs.readFileSync(studentsPath)
const stringFile = readPath.toString()
const jsonFile = JSON.parse(stringFile)
