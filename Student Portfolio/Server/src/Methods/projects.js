import {readFile, writeOnFile, postFunction} from './Function.js'
import {projects, students} from '../Routes/filenames.js'
import path from 'path'
import {v4 as uniqueId} from 'uuid'
const createId = uniqueId()

const __dirname = path.resolve()

let jsonFile =readFile(projects)
let filePath = path.join(__dirname, projects)
let studentFile = readFile(students)
//METHODS

//GET

export const getList = (`/:studentId/projects/`, (req, res)=>{
    let {studentId} = req.params
    let filteredList = jsonFile.filter(list=>list.ownerId===studentId)
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
    let check = jsonFile.filter(list=>list.ownerId===studentId)
    if(check.length === 0){
        let student = studentFile.filter(student=>student.id===studentId)
        let newList ={
            ownerName: student[0].name,
            ownerId: studentId,
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
        let filtered = jsonFile.filter(list=>list.ownerId !== studentId)
        filtered.push(check[0])
        writeOnFile(filtered, filePath)
        res.send(newObj)
        
    }

})

//DELETE

export const deleteObj = ('/:studentId/projects/', (req, res)=>{
    const {studentId} = req.params
    let studentProjects= jsonFile.filter(list=>list.ownerId===studentId)
    let projectList = studentProjects[0].projectList
    if(req.query && req.query.name){
        let studentFiltered = jsonFile.filter(list=>list.ownerId!==studentId)
        let newProjectList = projectList.filter(project=>project.name!==req.query.name)
        let student = studentFile.filter(student=>student.id===studentId)
        let newObj = {
            ownerName: student[0].name,
            ownerId:studentId,
            projectList:[]
        }
        newObj.projectList=newProjectList
        studentFiltered.push(newObj)
        writeOnFile(studentFiltered, filePath)
        res.send(newProjectList)
    }else{console.log('already deleted')}
    
})

//EDIT (PUT)

export const edit = ('/:studentId/projects/', (req, res)=>{
    const {studentId} = req.params
    let studentProjects= jsonFile.filter(list=>list.ownerId===studentId)
    let projectList = studentProjects[0].projectList
    if(req.query && req.query.name){
        let student = studentFile.filter(student=>student.id===studentId)
        let studentFiltered = studentFile.filter(student=>student.id!==studentId)
        let newProjectList = projectList.filter(project=>project.name!==req.query.name)
        let projectSelected = projectList.filter(project=>project.name===req.query.name)
        let newObj = req.body
        newObj={id: projectSelected[0].id, ...newObj}
        let newList = {
            ownerName: student[0].name,
            ownerId:studentId,
            projectList:[]
        }
        newList.projectList=[...newProjectList, newObj]
        studentFiltered.push(newList)
        writeOnFile(studentFiltered, filePath)
        res.send(newObj)
    }else{
        console.log('no edit')
    }
})