import http from "node:http"                      // Core Node Module for creating web servers and making HTTP requests
import { serveStatic } from "./utils/serveStatic.js" // Util func for rendering Home static assets
import { renderBranches } from "./utils/renderData.js";

// The server port declaration
const PORT = 8000
// Directory Name ("__" comes from prev CommonJS established practices)
const __dirname = import.meta.dirname

const server = http.createServer(async (req,res) => {

    // If URL is /, render home page = static local files
    if (req.url === '/') {
        await serveStatic(req, res, __dirname)
    
    // If URL is /team, render team list
    } else if (req.url === '/team') {
        console.log("TEAM LIST RENDERED HERE")
        
    // Else = un-handled URL, return 404
    } else {
        return await serveStatic(req, res, __dirname)
    }

})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))