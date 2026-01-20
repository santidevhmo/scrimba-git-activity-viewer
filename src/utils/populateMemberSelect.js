
export async function populateMemberSelect() {

    // Get the current members arr
    // Get the current members data as object 
    const getMembers = await fetch('/data/members.JSON') // This is client side. This is an internal HTTP GET request 
    if (!getMembers.ok) { 
        throw new Error(`HTTP ${getMembers.status}`) 
    } 
    // Turn response to JSON Object 
    const membersJSON = await getMembers.json()

    // Select the HTML Node
    const selectElement = document.getElementById("branch-members")
    selectElement.innerHTML = ''
    // Traverse through current members and populate the select node
    for (let member of membersJSON) {
        const option = document.createElement('option')
        option.value = member.name
        option.textContent = member.name
        selectElement.appendChild(option)
    }


}
