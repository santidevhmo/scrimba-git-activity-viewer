import { renderBranches, renderMembers } from "./utils/renderData.js";
import handleFormSubmit from "./utils/handleFormSubmit.js";

// Initial render of lists (branches and members lists) based on current JSON file data
await renderBranches()
await renderMembers()

// Form submit handling
let form = document.getElementById("new-branch-form")
form.addEventListener("submit", async (event) => { 
    // (Try/catch to handle errors from handleFormSubmit and its other internal async method calls)
    try {
        await handleFormSubmit(event)
    } catch (err) {
        throw new Error("BRANCH FORM SUBMISSION ERROR: ", err)
    }
})
// (It's async because handleFormSubmit is async because it calls "addNewData", which is an async method)