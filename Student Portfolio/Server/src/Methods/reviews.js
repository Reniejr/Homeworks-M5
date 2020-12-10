import {writeDB, readDB} from './Function.js'
import {projects, reviews, students} from '../Routes/filenames.js'
import path from 'path'
import {v4 as uniqueId} from 'uuid'
import {check, validationResult} from 'express-validator'
import { reviewRoute } from '../Routes/reviewsRoute.js'

//CREATE NEW ID
const createId = uniqueId()

const __dirname = path.resolve()


//VARIABLES
let filePath = path.join(__dirname, reviews)
let jsonFile = await readDB(filePath)
let projectFile = await readDB(projects)
let studentFile = await readDB(students)

export const getFile = ('/:projectId/', async(req, res, next)=>{
    try {
        const {projectId} = req.params
        let filtered = jsonFile.filter(review=>review.projectId === projectId)
        res.send(filtered)
    } catch (error) {
        next(error)
    }
})

export const postFile = ('/:projectId/', async(req, res, next)=>{
    try {
        const {projectId} = req.params
        let checkProject = jsonFile.filter(review=>review.projectId === projectId)
        if(req.query && req.query.reviewer){
            if(checkProject.lenght===0){
                let projectSelected = projectFile.filter(project=>project.id===projectId)
                let newList={
                    projectId:projectId,
                    projectName: projectSelected[0].name,
                    reviews:[]
                }
                // let studentSelected = studentFile.filter(student=>student.name===req.query.reviewer)
                let newObj=req.body
                newObj={
                    id: createId,
                    reviewer: req.query.reviewer,
                    ...newObj,
                    createdAt: new Date()
                }
                newList.reviews.push(newObj)
                jsonFile.push(newList)
                writeDB(jsonFile, filePath)
                console.log('newReviewer',newList)
                console.log('newComment',newList)
            }else{
                let newObj=req.body
                newObj={
                    id: createId,
                    reviewer: req.query.reviewer,
                    ...newObj,
                    createdAt: new Date()
                }
                checkProject[0].reviews.push(newObj)
                let filtered = jsonFile.filter(reviews=>reviews.projectId!==projectId)
                filtered.push(checkProject[0])
                writeDB(filtered, filePath)
                console.log(filtered, newObj)
            }

        }else{
            const err = new Error()
            console.log(err)
        }
    } catch (error) {
        
    }
} )