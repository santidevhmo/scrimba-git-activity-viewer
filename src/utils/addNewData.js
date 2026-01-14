import { getData } from "./getData"
import fs from 'node:fs/promises'
import path from "node:path"

// ====== ADD NEW BRANCH ======
async function addNewBranch(newBranch) {
    try {
        // Get the data
        const branchesData = await getData("branches")
        // Push the new object
        branchesData.push(newBranch)
        // Get the path to then access and modify the file
        const dataFilePath = path.join('data', 'branches.JSON')
        // Read the file content and replace with new data 
        await fs.writeFile(
            dataFilePath,
            JSON.stringify(branchesData, null, 2),
            'utf8'
        )
    } catch (err) {
        throw new Error("ADD NEW BRANCH ERR: ", err)
    }
}

// ====== ADD NEW MEMBER ======
async function addNewMember(newMember) {
    try {
        // Get the data
        const membersData = await getData("members")
        // Push the new object
        membersData.push(newMember)
        // Get the path to then access and modify the file
        const dataFilePath = path.join('data', 'members.JSON')
        // Read the file content and replace with new data 
        await fs.writeFile(
            dataFilePath,
            JSON.stringify(membersData, null, 2),
            'utf8'
        )
    } catch (err) {
        throw new Error("ADD NEW MEMBER ERR: ", err)
    }
}

export { addNewBranch, addNewMember }