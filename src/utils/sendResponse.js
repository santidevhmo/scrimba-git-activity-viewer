
// Util func for these repetitive lines of code

// payload = term for "the actual data carried inside a message or request/response"
export function sendResponse(res, statusCode, contentType, payload) {
    // Set the status code to what the param value is
    res.statusCode = statusCode
    // Specify the content type so browser knows what to do with it (render, read, etc)
    res.setHeader('Content-Type', contentType)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // Writes the response body and closes the HTTP response
    res.end(payload)
}