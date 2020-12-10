import {writeDB, readDB, readFile, writeOnFile} from './Function.js'
import {projects, reviews, students} from '../Routes/filenames.js'
import path from 'path'
import {v4 as uniqueId} from 'uuid'
import {check, validationResult} from 'express-validator'

//CREATE NEW ID
const createId = uniqueId()

const __dirname = path.resolve()


//VARIABLES
let filePath = path.join(__dirname, reviews)
// let jsonFile = await readDB(filePath)
// let projectFile = await readDB(projects)
// let studentFile = await readDB(students)
let jsonFile =  readFile(reviews)
let projectFile =  readFile(projects)
let studentFile =  readFile(students)

export const getFile = ('/:id', async(req, res, next)=>{
    try {
        const {id} = req.params
        let filtered = jsonFile.filter(review=>review.projectId === id)
        res.send(filtered)
    } catch (error) {
        console.log(error)
    }
})

export const postFile = ('/:id', async(req, res, next)=>{
    try {
        const {id} = req.params
        let checkProject = jsonFile.filter(review=>review.projectId === id)
        let project = projectFile.filter(project=>project.projectList.filter(project=>project.id===id))
        let projectSelected = project[0].projectList.filter(project=>project.id===id)
        if(req.query && req.query.reviewer){
            if(checkProject.length===0){

                let newList={
                    projectId:id,
                    projectName: projectSelected[0].name,
                    reviews:[]
                }
                let newObj=req.body
                newObj={
                    id: createId,
                    reviewer: req.query.reviewer,
                    ...newObj,
                    createdAt: new Date()
                }
                newList.reviews.push(newObj)
                jsonFile.push(newList)
                console.log(projectSelected)
                writeOnFile(jsonFile, filePath)
                res.send(newObj)
            }else{
                let newObj=req.body
                newObj={
                    id: createId,
                    reviewer: req.query.reviewer,
                    ...newObj,
                    createdAt: new Date()
                }
                checkProject[0].reviews.push(newObj)
                let filtered = jsonFile.filter(reviews=>reviews.projectId!==id)
                filtered.push(checkProject[0])
                writeOnFile(filtered, filePath)
                res.send(newObj)
            }

        }else{
            const err = new Error()
            console.log(err)
        }
    } catch (error) {
        console.log(error)
    }
} )

export const deleteReview = ('/:id', async (req, res, next)=>{
    try {
        const {id}=req.params
        let filtered = jsonFile.filter(project=>project.projectId ===id)
        let reviewList = filtered[0].reviews
        if(req.query && req.query.name){
            let newReviewList = reviewList.filter(review=>review.name!==req.query.name)
            let filteredWithout = jsonFile.filter(project=>project.projectId !==id)
            reviewList=newReviewList
            filtered[0].reviews=reviewList
            filteredWithout.push(filtered[0])
            writeOnFile(filteredWithout, filePath)
            res.send(filteredWithout)           
        }else{
            const err = new Error()
            err.httpStatusCode = 404
            next(err)
        }
    } catch (error) {
        console.log(error)
    }
})