import { renderMembers } from "./renderData.js";
import { populateMemberSelect } from "./populateMemberSelect.js";

export default async function handleMemberFormSubmit(event) {
    event.preventDefault() // Stop default browser redirect its form submit action

    // Get the form data
    const formData = new FormData(event.target);
    const newMember = {
        "name": formData.get("name"),
        "role": formData.get("role")
    }
    // No error handling because HTML input tags already have 'required' property set

    console.log("Submitting member:", newMember)
    const res = await fetch("/api/members", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMember),
    })
    // FETCH error handling
    if (!res.ok) {
        throw new Error(`POST /api/members failed: HTTP ${res.status}`)
    }
    console.log("POST /api/members ok:", res.status)

    // Re-render members list and update branch member select
    await renderMembers()
    await populateMemberSelect()

    // Clear form
    event.target.reset()
}
