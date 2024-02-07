// check the request query to not have any query parameters

export const noQueryParams = (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        return res.status(400).send();
    }
    next();
}