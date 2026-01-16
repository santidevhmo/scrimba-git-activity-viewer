import http from "node:http"                      // Core Node Module for creating web servers and making HTTP requests
import fs from "node:fs/promises"
import path from "node:path"
import { serveStatic } from "./utils/serveStatic.js" // Util func for rendering Home static assets

// The server port declaration
const PORT = 8000
// Directory Name ("__" comes from prev CommonJS established practices)
const __dirname = import.meta.dirname

const server = http.createServer(async (req,res) => {

    // If URL is /, render home page = static local files
    if (req.url === '/') {
        await serveStatic(req, res, __dirname)

    // POST ENDPOINT : add a new branch
    } else if (req.url === '/api/branches' && req.method === 'POST') {
        try {
            console.log("POST /api/branches received")
            let body = ''
            for await (const chunk of req) {
                body += chunk
            }
            const newBranch = JSON.parse(body)
            console.log("Parsed branch payload:", newBranch)
            if (!newBranch?.name || !newBranch?.status) {
                res.statusCode = 400
                res.setHeader("Content-Type", "application/json")
                return res.end(JSON.stringify({ error: "name and status are required" }))
            }

            const dataFilePath = path.join(__dirname, 'data', 'branches.JSON')
            console.log("Writing branches to:", dataFilePath)
            const fileContents = await fs.readFile(dataFilePath, 'utf8')
            const branchesData = JSON.parse(fileContents)
            branchesData.push(newBranch)
            await fs.writeFile(
                dataFilePath,
                JSON.stringify(branchesData, null, 2),
                'utf8'
            )
            console.log("Branch saved. Total branches:", branchesData.length)

            res.statusCode = 201
            res.setHeader("Content-Type", "application/json")
            return res.end(JSON.stringify({ ok: true }))
        } catch (err) {
            console.log("POST /api/branches error:", err)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            return res.end(JSON.stringify({ error: "failed to add branch" }))
        }
    
    // If URL is /team, render team list
    } else if (req.url === '/team') {
        console.log("TEAM LIST RENDERED HERE")
        
    // Else = un-handled URL, return 404
    } else {
        return await serveStatic(req, res, __dirname)
    }

})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
