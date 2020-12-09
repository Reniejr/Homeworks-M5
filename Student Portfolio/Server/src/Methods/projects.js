import {readFile, writeOnFile, postFunction} from './Function.js'
import {projects} from '../Routes/filenames.js'
import path from 'path'
import {v4 as uniqueId} from 'uuid'
const createId = uniqueId()

const __dirname = path.resolve()

let jsonFile =readFile(projects)
let filePath = path.join(__dirname, projects)
//METHODS

//GET

export const getList = (`/:studentId/projects/`, (req, res)=>{
    let {studentId} = req.params
    let filteredList = jsonFile.filter(list=>list.owner===studentId)


    if(req.query && req.query.name){
        let filterProjects = filteredList[0].projectList.filter(project=>project.name===req.query.name)
        res.send(filterProjects)
    }else{
        res.send(filteredList)

    }
})


//POST

export const create = ('/:studentId/projects/', (req, res)=>{
    const {studentId} = req.params
    let check = jsonFile.filter(list=>list.owner===studentId)
    if(check.length === 0){
        let newList ={
            owner: studentId,
            projectList:[]
        }
        let newObj = req.body
        newObj={id:createId, ...newObj}
        newList.projectList.push(newObj)
        jsonFile.push(newList)
        writeOnFile(jsonFile, filePath)
        res.send(newObj)
    }else{
        let newObj = req.body
        newObj={id:createId, ...newObj}
        check[0].projectList.push(newObj)
        let filtered = jsonFile.filter(list=>list.owner !== studentId)
        filtered.push(check[0])
        writeOnFile(filtered, filePath)
        res.send(newObj)
        
    }
    // res.send(console.log(`New Student with id = ${newStudent.id} has been created`))

    
})

//DELETE

export const deleteObj = ('/:studentId/projects/', (req, res)=>{
    const {studentId} = req.params
    let studentProjects= jsonFile.filter(list=>list.owner===studentId)
    let projectList = studentProjects[0].projectList
    let studentFiltered = jsonFile.filter(list=>list.owner!==studentId)
    if(req.query && req.query.name){
        let newProjectList = projectList.filter(project=>project.name!==req.query.name)
        let newObj = {
            owner:studentId,
            projectList:[]
        }
        newObj.projectList.push(newProjectList)
        studentFiltered.pusch(newObj)
        writeOnFile(studentFiltered, filePath)
        res.send(newProjectList)
    }else{console.log('already deleted')}
    
})

//EDIT (PUT)

export const edit = ('/:studentId/projects/:id', (req, res)=>{
    const {id} = req.params
    let editObj = req.body
    editObj={id:id, ...editObj}
    let newJsonFile = jsonFile.filter(user=>user.id!==id)
    newJsonFile.push(editObj)
    writeOnFile(newJsonFile, filePath)
    res.send(editObj)
})