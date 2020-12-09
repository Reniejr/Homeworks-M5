import {readFile, writeOnFile, postFunction} from './Function.js'
import {students} from '../Routes/filenames.js'
import path from 'path'

const __dirname = path.resolve()

let jsonFile =readFile(students)
let filePath = path.join(__dirname, students)
//METHODS

//GET

export const getList = ('/', (req, res)=>{
    console.log(req.query)
    if(req.query && req.query.studentId){
        let filtered = jsonFile.filter(student=>student.id===req.query.studentId)
        res.send(filtered)
    }else{

        res.send(jsonFile)
    }
})

//GET by ID

export const getById = ('/:id', (req, res)=>{
    const {id} = req.params
    const searchedObj = jsonFile.filter(user=>user.id===id)
    res.send(searchedObj)
})

//POST

export const create = ('/', (req, res)=>{
    let newObj = req.body
    let check = jsonFile.filter(Obj=>Obj.email===newObj.email)
    check.length>0? res.send(console.log('Error: There is another student with that Email')) : postFunction(newObj, jsonFile, filePath, res)
    // res.send(console.log(`New Student with id = ${newStudent.id} has been created`))

    
})

//DELETE

export const deleteObj = ('/:id', (req, res)=>{
    const {id} = req.params
    const newJsonFile = jsonFile.filter(user=>user.id!==id)
    writeOnFile(newJsonFile, filePath)
    res.send(newJsonFile)
})

//EDIT (PUT)

export const edit = ('/:id', (req, res)=>{
    const {id} = req.params
    let editObj = req.body
    editObj={id:id, ...editObj}
    let newJsonFile = jsonFile.filter(user=>user.id!==id)
    newJsonFile.push(editObj)
    writeOnFile(newJsonFile, filePath)
    res.send(editObj)
})