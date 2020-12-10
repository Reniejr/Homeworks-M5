import fs from 'fs'
import path from 'path'
import {v4 as uniqueId} from 'uuid'
import pkg from 'fs-extra';
const {readJson, writeJson} = pkg;


const createId = uniqueId()

const __dirname = path.resolve()


//READFILE
export const readFile = (filename)=>{
    const filePath = path.join(__dirname, filename)
    const readPath = fs.readFileSync(filePath)
    const stringFile = readPath.toString()
    return JSON.parse(stringFile)
}

//WRITE ON API

export const writeOnFile = (array, filePath)=>{
    return fs.writeFileSync(filePath, JSON.stringify(array))
 }
 
 //POST FUNCTION
 
export const postFunction = (obj, array, filePath, res)=>{
    obj={id:createId, ...obj}
    array.push(obj)
    writeOnFile(array, filePath)
    return res.send(obj)
}

//READ FILE with FS-EXTRA
export const readDB = async filepath =>{
    try {
        const fileContent = await readJson(filepath)
        return fileContent
    } catch (error) {
        throw new Error(error)
    }
}

//WRITE FILE with FS-EXTRA
export const writeDB = async (filepath, content) =>{
    try {
        await writeJson(filepath, content)
    } catch (error) {
        throw new Error(error)
    }
}