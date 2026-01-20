import { renderBranches } from "./renderData.js";

export default async function handleBranchFormSubmit(event) {

    event.preventDefault() // Stop default browser redirect its form submit action

    // Get the form data
    const formData = new FormData(event.target);
    const newBranch = {
        "name": formData.get("name"),
        "status": formData.get("status"),
        "members": [formData.get("members")]
    }
    // No error handling because HTML input tags already have 'required' property set

    // Push new data via server 
    // (this is server-side handling code, not client handling)
    const res = await fetch("/api/branches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(newBranch),
    })
    // FETCH error handling
    if (!res.ok) {
        throw new Error(`POST /api/branches failed: HTTP ${res.status}`)
    }
    console.log("POST /api/branches ok:", res.status)
    
    // Re-render branches
    await renderBranches()

    // Clear form
    event.target.reset()
}
