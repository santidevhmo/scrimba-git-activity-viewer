# Project Description:

Concept (LATEST PIVOT):
A fake git repo feed of the current branches, members working on it, and the branch's status.

Putting into practice:
- Server INIT & PORT opening
- Routes
- Handlers
- Utils
    - JSON parsing
- Event-driven architecture
- Static frontend rendering
- fs-based append-only logs

Stretch goals:
- Local storage to save activity log and team
- Filter events by type
- Export activity report PDF
- Mock email notifications


# The project divided into phases and tasks:

## Tech Stack:
- HTML/CSS/JS
- Node JS

## Working Backend
- [x] Define data structures of Team Members, Branches, and Actions
- [] Render current data:
    - [x] Render branches 
    - [] Render members
- [] Add functionality to "Register a new branch" button
- [] Add functionality to "Edit Git Repo Name" button
- [] Add functionality to "Create a new team member" button

Team members
Actions

Relationships:
- An action has a team member assigned to it

member:
{
    name: "",
    role: "",
    actions: {

    }
}

branch {
    title: ""
}

action:
{
    title: "",
    status: "",
    branch: _____,
    member_assigned: ____
}

# Future extra ideas
- A sort of UUID but for assigning random color or profile placeholders to each member
- Icons in member and branches list