import {v4 as uniqueId} from 'uuid'
import fs from 'fs'
import path from 'path'

const createId = uniqueId()

//PATH AND ARRAYS INITIALIZED
const __dirname = path.resolve()
const studentsPath = path.join(__dirname, './src/Data/students.json')
const readPath = fs.readFileSync(studentsPath)
const stringFile = readPath.toString()
let jsonFile = JSON.parse(stringFile)

//WRITE ON API

const writeOnFile = (array)=>{
   return fs.writeFileSync(studentsPath, JSON.stringify(array))
}

//METHODS

//GET

export const getList = ('/', (req, res)=>{
    res.send(jsonFile)
})

//GET by ID

export const getById = ('/:id', (req, res)=>{
    const {id} = req.params
    const searchedStudent = jsonFile.filter(user=>user.id===id)
    res.send(searchedStudent)
})

//POST

export const createStudent = ('/', (req, res)=>{
    let newStudent = req.body
    newStudent={id:createId, ...newStudent}
    jsonFile.push(newStudent)
    writeOnFile(jsonFile)
    res.send(console.log(`New Student with id = ${newStudent.id} has been created`))
})