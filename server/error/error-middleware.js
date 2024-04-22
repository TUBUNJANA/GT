const errorMidleware = (error, request, response, next) => {
    const status = error.status || 500;
    const message = error.message || "Backend Error";
    const extadetails = error.extraDetails || "Error from backend";
    return response.status(status).json({ message, extraDetails });
}

module.exports = errorMidleware;