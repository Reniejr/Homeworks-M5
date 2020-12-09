import {v4 as uniqueId} from 'uuid'
import {readFile, writeOnFile, postFunction} from './Function.js'
import {movies} from '../Routes/filenames.js'

const createId = uniqueId()

let jsonFile = readFile(movies)
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

export const create = ('/', (req, res)=>{
    let newStudent = req.body
    let check = jsonFile.filter(student=>student.email===newStudent.email)
    check.length>0? res.send(console.log('Error: There is another student with that Email')) : postFunction(newStudent, jsonFile, res)
    // res.send(console.log(`New Student with id = ${newStudent.id} has been created`))

    
})

//DELETE

export const deleteObj = ('/:id', (req, res)=>{
    const {id} = req.params
    const newJsonFile = jsonFile.filter(user=>user.id!==id)
    writeOnFile(newJsonFile)
    res.send(newJsonFile)
})

//EDIT (PUT)

export const edit = ('/:id', (req, res)=>{
    const {id} = req.params
    let editStudent = req.body
    editStudent={id:id, ...editStudent}
    let newJsonFile = jsonFile.filter(user=>user.id!==id)
    newJsonFile.push(editStudent)
    writeOnFile(newJsonFile)
    res.send(editStudent)
})