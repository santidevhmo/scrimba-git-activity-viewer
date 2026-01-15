import { addNewBranch } from "./addNewData.js";
import { renderBranches } from "./renderData.js";

export default async function handleFormSubmit(event) {

    event.preventDefault() // Stop default browser redirect its form submit action

    // Get the form data
    const formData = new FormData(event.target);
    const newBranch = {
        "name": formData.get("name"),
        "status": formData.get("status")
    }
    // No error handling because HTML input tags already have 'required' property set

    // Push new data
    await addNewBranch(newBranch)
    // Re-render banchers
    await renderBranches()
}