
// Client Side Rendering applied (NODE cannot manipulate DOM)

// ====== RENDER BRANCHES LIST ========
async function renderBranches() {
   
    // -------
    // Fetch branches JSON data -> Convert to object -> Traverse it -> Add each branch as HTML node
    // -------
    
    try {
        // Get branch data as Object
        const getBranches = await fetch('/data/branches.JSON') // This is client side. This is an internal HTTP GET request)
        if (!getBranches.ok) { 
            throw new Error(`HTTP ${getBranches.status}`)
        }
        // Turn response to Object
        const branchesData = await getBranches.json()
        console.log("Fetched branches:", branchesData)

        // Get branches list node
        let branchesListNode = document.getElementById('branches-list')
        
        // Traverse the branches and: create new node and append to branches list container
        for (let i = 0; i < branchesData.length; i++) {
            const branchNode = document.createElement('div');
            // Create two paragraph elements
            const branchNameNode = document.createElement('h3');
            branchNameNode.textContent = branchesData[i].name
            const branchStatusNode = document.createElement('p');
            branchStatusNode.textContent = branchesData[i].status
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

// ====== RENDER MEMBERS LIST ========
async function renderMembers() {
   
    // -------
    // Fetch members JSON data -> Convert to object -> Traverse it -> Add each member as HTML node
    // -------
    
    try {
        // Get member data as Object
        const getMembers = await fetch('/data/members.JSON') // This is client side. This is an internal HTTP GET request)
        if (!getMembers.ok) { 
            throw new Error(`HTTP ${getMembers.status}`)
        }
        // Turn response to Object
        const membersData = await getMembers.json()

        // Get members list node
        let membersListNode = document.getElementById('members-list')
        
        // Traverse the members and: create new node and append to branches list container
        for (let i = 0; i < membersData.length; i++) {
            const memberNode = document.createElement('div');
            // Create two paragraph elements
            const memberNameNode = document.createElement('h3');
            memberNameNode.textContent = membersData[i].name
            const memberRoleNode = document.createElement('p');
            memberRoleNode.textContent = membersData[i].role
            // Append the paragraphs to the div
            memberNode.appendChild(memberNameNode);
            memberNode.appendChild(memberRoleNode);

            // Append this new branch list element to the main branches list container
            if (i === 0) { // If it's the first branch, remove empty list placeholder on current HTML and add the branch
                membersListNode.innerHTML = ''
                membersListNode.appendChild(memberNode)
            } else {
                membersListNode.appendChild(memberNode)
            }
        }


    } catch (err) {
        console.log("ERR RENDERING BRANCHES:", err)
    }
}


export { renderBranches, renderMembers }
