
// ======================================
// GET DATA:
// util func to get local JSON data as an object correctly handling different user OS file path systems
// ======================================

import fs from "node:fs/promises"
import path from "node:path"

export async function getData(type) {

    if (type === "branches" || type === "members") {

        try {
            const pathJSON = path.join('data', `${type}.JSON`)
            const data = await fs.readFile(pathJSON, 'utf-8')
            const parsedData = JSON.parse(data)
            return parsedData
        } catch (err) {
            console.log("GETDATA ERR: ", err)
            return []
        }

    } else {
        console.log("ERROR : param empty or not equal to 'members' or 'branches'")
        return []
    }

}

