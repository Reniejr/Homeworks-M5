import {postFunction, readDB, writeDB, writeOnFile, readFile} from './Function.js'
import {students} from '../Routes/filenames.js'
import path from 'path'
import {check, validationResult} from 'express-validator'

const __dirname = path.resolve()

let filePath = path.join(__dirname, students)
// let jsonFile = await readDB(filePath)
let jsonFile = readFile(students)
//METHODS

//GET

export const getList = ('/', (req, res, next)=>{
    try {
        if(req.query && req.query.studentId){
            let filtered = jsonFile.filter(student=>student.id===req.query.studentId)
            res.send(filtered)
        }else{
    
            res.send(jsonFile)
        }
    } catch (error) {
        next(error)
    }
    
})

//GET by ID

export const getById = ('/:id', (req, res, next)=>{
    try {
        const {id} = req.params
        const searchedObj = jsonFile.filter(user=>user.id===id)
        res.send(searchedObj)
    } catch (error) {
        next(error)
    }
    
})

//POST

export const create = ('/',[
                            check("name").exists().withMessage('There is no name'),
                            check("email").exists().withMessage('There is no email'),
                            check("surname").exists().withMessage('There is no surname'),
                            check("staff").isBoolean().withMessage('This should be a true or false'),
                            ], (req, res, next)=>{
    try {

        const error = validationResult(req)

        if(!error.isEmpty()){
            const err = new Error()
            err.message= error
            err.httpStatusCode = 400
            next(err)            
        }else{
            let newObj = req.body
            let check = jsonFile.filter(Obj=>Obj.email===newObj.email)

            if(check.length>0){
                const err = new Error()
                err.message = 'There is another student with that email'
                err.httpStatusCode = 400
                next(err)
            }else{
                postFunction(newObj, jsonFile, filePath, res)
            }
            // check.length>0? res.send(console.log('Error: There is another student with that Email')) : postFunction(newObj, jsonFile, filePath, res)
        }
    } catch (error) {
        next(error)
    }
    

    
})

//DELETE

export const deleteObj = ('/:id', async (req, res, next)=>{
    try {
        const {id} = req.params
        const newJsonFile = jsonFile.filter(user=>user.id!==id)
        writeOnFile(newJsonFile, filePath)
        res.send(newJsonFile)
    } catch (error) {
        next(error)
    }
    
})

//EDIT (PUT)

export const edit = ('/:id', async(req, res, next)=>{
    try {
        const {id} = req.params
        let editObj = req.body
        editObj={id:id, ...editObj}
        let newJsonFile = jsonFile.filter(user=>user.id!==id)
        newJsonFile.push(editObj)
        writeOnFile(newJsonFile, filePath)
        res.send(editObj)
    } catch (error) {
        next(error)
    }
    
})