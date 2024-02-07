const responseHeaders = {
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "X-Content-Type-Options": "nosniff",
    "Date": new Date().toGMTString()
}

export const onlyGetMethodAllowed = (req, res, next) => {
    if(req.method === "GET"){
        next();
    }
    else{
        res.header(responseHeaders);
        res.status(405).send();
    }
}