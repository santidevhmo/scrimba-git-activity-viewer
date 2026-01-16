import { renderBranches, renderMembers } from "./utils/renderData.js";
import handleFormSubmit from "./utils/handleFormSubmit.js";

// Initial render of lists (branches and members lists) based on current JSON file data
await renderBranches()
await renderMembers()

const form = document.getElementById("new-branch-form")
if (form) {
    form.addEventListener("submit", async (event) => { 
        try {
            await handleFormSubmit(event)
        } catch (err) {
            console.log("BRANCH FORM SUBMISSION ERROR:", err)
        }
    })
}
