// import { getData } from "./getData.js"

// PIVOT : Client Side Rendering (NODE cannot manipulate DOM)
export async function renderBranches() {
   
    // -------
    // Fetch branchJSON data -> Convert to object -> Traverse it -> Add each branch as HTML node
    // -------
    
    try {
        // Get branch data as Object
        const getBranches = await fetch('../data/branches.json') // This is client side. This is an internal HTTP GET request)
        if (!getBranches.ok) { 
            throw new Error(`HTTP ${res.status}`)
        }
        // Turn response to Object
        const branchesData = await getBranches.json()

        // Get branches list node
        let branchesListNode = document.getElementById('branches-list')
        
        // Traverse the branches and: create new node and append to branches list container
        for (let i = 0; i < branchesData.length; i++) {
            const branchNode = document.createElement('div');
            // Create two paragraph elements
            const branchNameNode = document.createElement('h3');
            branchNameNode.textContent = branchesData[i].title
            const branchStatusNode = document.createElement('p');
            branchNameNode.textContent = branchesData[i].status
            // Append the paragraphs to the div
            branchNode.appendChild(branchNameNode);
            branchNode.appendChild(branchStatusNode);

            // Append this new branch list element to the main branches list container
            if (i === 0) { // If it's the first branch, remove empty list placeholder on current HTML and add the branch
                branchesListNode.innerHTML = ''
                branchesListNode.appendChild(branchNode)
            } else {
                branchesListNode.appendChild(branchNode)
            }
        }


    } catch (err) {
        console.log("ERR RENDERING BRANCHES:", err)
    }
}