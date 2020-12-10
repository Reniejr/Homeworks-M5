import express, { Router } from 'express'
import multer from 'multer'
import pkg from 'fs-extra';
const {writeFile} = pkg;
import path from 'path'


const __dirname = path.resolve(),
    upload = multer({}),
    studentProfilePicFolder = path.join(__dirname, './public/assets/students'),
    multiImages = path.join(__dirname, './public/assets/multi_images')

export const fileRouter = express.Router()

fileRouter.post('/profilePic', upload.single("avatar"), async(req, res, next)=>{
    try {
        await writeFile(
            path.join(
                studentProfilePicFolder, req.file.originalname),
                 req.file.buffer
        )
        res.send(`The ${req.file.originalname} has been uploaded`)
    } catch (error) {
        console.log(error)
    }
})

fileRouter.post('/multipleImages', upload.array('multi-images', 3), async(req, res, next)=>{
    try {
        const arrayOfPromises = req.files.map(file=>
            writeFile(path.join(multiImages, file.originalname), file.buffer)
        )
        await Promise.all(arrayOfPromises)
        res.send('ok')
    } catch (error) {
        console.log(error)
    }
})