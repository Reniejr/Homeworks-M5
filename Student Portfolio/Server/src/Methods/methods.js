import {v4 as uniqueId} from 'uuid'
import fs from 'fs'
import path from 'path'
import { json } from 'express'

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

//POST FUNCTION

const postFunction = (obj, array, res)=>{
    obj={id:createId, ...obj}
    array.push(obj)
    writeOnFile(array)
    return res.send(obj)
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
    let check = jsonFile.filter(student=>student.email===newStudent.email)
    check.length>0? res.send(console.log('Error: There is another student with that Email')) : postFunction(newStudent, jsonFile, res)
    // res.send(console.log(`New Student with id = ${newStudent.id} has been created`))

    
})

//DELETE

export const deleteStudent = ('/:id', (req, res)=>{
    const {id} = req.params
    const newJsonFile = jsonFile.filter(user=>user.id!==id)
    writeOnFile(newJsonFile)
    res.send(newJsonFile)
})

//EDIT (PUT)

export const editStudent = ('/:id', (req, res)=>{
    const {id} = req.params
    let editStudent = req.body
    editStudent={id:id, ...editStudent}
    let newJsonFile = jsonFile.filter(user=>user.id!==id)
    newJsonFile.push(editStudent)
    writeOnFile(newJsonFile)
    res.send(editStudent)
})