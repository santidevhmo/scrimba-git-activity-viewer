import { renderBranches, renderMembers } from "./utils/renderData.js";
import handleBranchFormSubmit from "./utils/handleBranchFormSubmit.js";
import { populateMemberSelect } from "./utils/populateMemberSelect.js";
import handleMemberFormSubmit from "./utils/handleMemberFormSubmit.js";

// Initial render of lists (branches and members lists) based on current JSON file data
await renderBranches()
await renderMembers()

// Initial population of "Register new branch" members select option
await populateMemberSelect()

function updateInputsDescriptionVisibility() {
    const branchFormContainer = document.getElementById('new-branch-form-container')
    const memberFormContainer = document.getElementById('new-member-form-container')
    const descriptionNode = document.getElementById('input-description')
    const isBranchHidden = getComputedStyle(branchFormContainer).display === "none"
    const isMemberHidden = getComputedStyle(memberFormContainer).display === "none"
    descriptionNode.style.display = isBranchHidden && isMemberHidden ? "block" : "none"
}

// Register new form action btn
document.getElementById('register-new-branch-btn').addEventListener("click", () => {
    const branchFormContainer = document.getElementById('new-branch-form-container')
    const memberFormContainer = document.getElementById('new-member-form-container')
    branchFormContainer.style.display = "block"
    memberFormContainer.style.display = "none"
    updateInputsDescriptionVisibility()
})

// Add new member action btn (toggle form visibility)
document.getElementById('add-team-member').addEventListener("click", () => {
    const branchFormContainer = document.getElementById('new-branch-form-container')
    const memberFormContainer = document.getElementById('new-member-form-container')
    const isHidden = memberFormContainer.style.display === "none" || memberFormContainer.style.display === ""
    memberFormContainer.style.display = isHidden ? "block" : "none"
    if (isHidden) {
        branchFormContainer.style.display = "none"
    }
    updateInputsDescriptionVisibility()
})

// Change Repo name btn handling
document.getElementById('edit-repo-name-btn').addEventListener("click", () => {
    // document.getElementById('repo-name').textContent = 
})

const form = document.getElementById("new-branch-form")
if (form) {
    form.addEventListener("submit", async (event) => { 
        try {
            await handleBranchFormSubmit(event)
            document.getElementById('new-branch-form-container').style.display = "none"
            updateInputsDescriptionVisibility()
        } catch (err) {
            console.log("BRANCH FORM SUBMISSION ERROR:", err)
        }
    })
}

const memberForm = document.getElementById("new-member-form")
if (memberForm) {
    memberForm.addEventListener("submit", async (event) => {
        try {
            await handleMemberFormSubmit(event)
            document.getElementById('new-member-form-container').style.display = "none"
            updateInputsDescriptionVisibility()
        } catch (err) {
            console.log("MEMBER FORM SUBMISSION ERROR:", err)
        }
    })
}

updateInputsDescriptionVisibility()
