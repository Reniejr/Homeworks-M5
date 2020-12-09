import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()

//READFILE
export const readFile = (filename)=>{
    const studentsPath = path.join(__dirname, filename)
    const readPath = fs.readFileSync(studentsPath)
    const stringFile = readPath.toString()
    return JSON.parse(stringFile)
}

//WRITE ON API

export const writeOnFile = (array)=>{
    return fs.writeFileSync(studentsPath, JSON.stringify(array))
 }
 
 //POST FUNCTION
 
export const postFunction = (obj, array, res)=>{
    obj={id:createId, ...obj}
    array.push(obj)
    writeOnFile(array)
    return res.send(obj)
}