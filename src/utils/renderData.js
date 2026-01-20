
// Client Side Rendering applied (NODE cannot manipulate DOM)

// ====== RENDER BRANCHES LIST ========
async function renderBranches() {
   
    // -------
    // Fetch branches JSON data -> Convert to object -> Traverse it -> Add each branch as HTML node
    // -------
    
    try {
        // Get branch data as Object
        const [getBranches, getMembers] = await Promise.all([
            fetch('/data/branches.JSON'),
            fetch('/data/members.JSON')
        ])
        if (!getBranches.ok) {
            throw new Error(`HTTP ${getBranches.status}`)
        }
        if (!getMembers.ok) {
            throw new Error(`HTTP ${getMembers.status}`)
        }
        // Turn response to Object
        const branchesData = await getBranches.json()
        const membersData = await getMembers.json()
        const memberNameById = new Map(membersData.map((member) => [member.id, member.name]))
        const memberNameByName = new Map(membersData.map((member) => [member.name, member.name]))

        // Get branches list node
        let branchesListNode = document.getElementById('branches-list')
        branchesListNode.innerHTML = ''
        
        // Traverse the branches and: create new node and append to branches list container
        for (let i = 0; i < branchesData.length; i++) {
            const branchNode = document.createElement('div');
            branchNode.className = 'card bg-dark text-white border-secondary'
            const cardBody = document.createElement('div')
            cardBody.className = 'card-body'

            const headerRow = document.createElement('div')
            headerRow.className = 'd-flex align-items-center gap-2'
            const branchIcon = document.createElement('i')
            branchIcon.className = 'bi bi-git fs-4 text-info'
            const branchNameNode = document.createElement('h3')
            branchNameNode.className = 'h5 mb-0'
            branchNameNode.textContent = branchesData[i].name
            headerRow.appendChild(branchIcon)
            headerRow.appendChild(branchNameNode)

            const branchStatusNode = document.createElement('span')
            branchStatusNode.className = 'badge text-bg-secondary ms-auto'
            branchStatusNode.textContent = branchesData[i].status
            headerRow.appendChild(branchStatusNode)

            const membersWrapper = document.createElement('div')
            membersWrapper.className = 'mt-3'
            const membersLabel = document.createElement('div')
            membersLabel.className = 'text-secondary small'
            membersLabel.textContent = 'Members'
            const membersList = document.createElement('div')
            membersList.className = 'd-flex flex-wrap gap-2 mt-1'

            const branchMembers = Array.isArray(branchesData[i].members) ? branchesData[i].members : []
            if (branchMembers.length === 0) {
                const emptyBadge = document.createElement('span')
                emptyBadge.className = 'badge text-bg-secondary'
                emptyBadge.textContent = 'No members'
                membersList.appendChild(emptyBadge)
            } else {
                for (const memberRef of branchMembers) {
                    const memberName =
                        memberNameById.get(memberRef) ||
                        memberNameByName.get(memberRef) ||
                        memberRef
                    const memberBadge = document.createElement('span')
                    memberBadge.className = 'badge text-bg-secondary'
                    memberBadge.textContent = memberName
                    membersList.appendChild(memberBadge)
                }
            }

            membersWrapper.appendChild(membersLabel)
            membersWrapper.appendChild(membersList)

            cardBody.appendChild(headerRow)
            cardBody.appendChild(membersWrapper)
            branchNode.appendChild(cardBody)
            branchesListNode.appendChild(branchNode)
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
        membersListNode.innerHTML = ''
        
        // Traverse the members and: create new node and append to branches list container
        for (let i = 0; i < membersData.length; i++) {
            const memberNode = document.createElement('div');
            memberNode.className = 'card bg-dark text-white border-secondary'
            const cardBody = document.createElement('div')
            cardBody.className = 'card-body'

            const headerRow = document.createElement('div')
            headerRow.className = 'd-flex align-items-center gap-2'
            const memberIcon = document.createElement('i')
            memberIcon.className = 'bi bi-person-badge fs-4 text-warning'
            const memberNameNode = document.createElement('h3')
            memberNameNode.className = 'h5 mb-0'
            memberNameNode.textContent = membersData[i].name
            headerRow.appendChild(memberIcon)
            headerRow.appendChild(memberNameNode)

            const memberRoleNode = document.createElement('p')
            memberRoleNode.className = 'text-secondary mb-0 mt-2'
            memberRoleNode.textContent = membersData[i].role

            cardBody.appendChild(headerRow)
            cardBody.appendChild(memberRoleNode)
            memberNode.appendChild(cardBody)
            membersListNode.appendChild(memberNode)
        }


    } catch (err) {
        console.log("ERR RENDERING BRANCHES:", err)
    }
}


export { renderBranches, renderMembers }
