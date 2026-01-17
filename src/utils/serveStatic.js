import path from "node:path"
import mime from 'mime'
import fs from "node:fs/promises"

import { sendResponse } from './sendResponse.js'
import { pid } from "node:process"

// ============================================================================
// serveStatic:
// util func to serve local static files depending on the req url 
// (Serve either index.html, page-not-found.html, etc)
// ============================================================================
// ============================================================================
// PARAMS: 
// res = to set status code, headers, new body, and send it back to browser
// req = optional
// baseURL = to get the file path on disk, handling different user OS systems 
// and its file paths
// ============================================================================

export async function serveStatic(req, res, baseURL) {
    
    // Get file path as well as content type to pass to response callback
    const requestPath = req.url === '/' ? 'index.html' : req.url.slice(1)
    const filePath = path.join(baseURL, requestPath)
    const contentType = mime.getType(filePath)

    // Using try catch to gracefully handle errors out of our control
    try {
        console.log("Serving file:", filePath)
        // Turn the content to Buffer (bits) for browser to read successfully
        const content = await fs.readFile(filePath)
        // Send response and necessary properties to util func to end HTTP response successfully
        sendResponse(res, 200, contentType, content)

    } catch (err) {
        // ENOENT = file or directory does not exit or cannot be found
        // If error code is ENOENT, return 404 error page
        if (err.code === 'ENOENT') {
            // Re-build file path and content specifically for 404 error page
            const filePath = path.join(baseURL, 'pages', 'page-not-found.html')
            const content = await fs.readFile(filePath)
            const contentType = mime.getType(filePath)
            sendResponse(res, 404, contentType, content)
        // Else (error other than 404), render error code as h1 HTML tag
        } else {
            sendResponse(res, 500, 'text/html', `<html><h1>Server Error: ${err.code}</h1></html>`)
        }
    }

}
