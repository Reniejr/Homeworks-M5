export const notFound = (err, res, req, next)=>{
    if(err.httpStatusCode === 404){
        res.status(404).send('Not Found')
    }next(err)
}
export const unAuthorized = (err, res, req, next)=>{
    if(err.httpStatusCode === 401){
        res.status(401).send('UnAuthorized')
    }next(err)
}
export const forbidden = (err, res, req, next)=>{
    if(err.httpStatusCode === 403){
        res.status(403).send('Forbidden')
    }next(err)
}
export const badRequest = (err, res, req, next)=>{
    if(err.httpStatusCode === 400){
        res.status(400).send(err.message)
    }next(err)
}
export const catchAll = (err, res, req, next)=>{
    if(!res.headersSent){
        res.status(500).send('Generic Server Error')
    }
}