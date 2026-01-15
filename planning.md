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
- [x] Render current data:
    - [x] Render branches 
    - [x] Render members
- [] Add functionality to "Register a new branch" button
    - [x] Finish HTML form of this action
    - [] Create util func that fills select values: call getData, get members data, select members selector and fill it with values (In progress)
        - [] Start the server, open the built-in browser (cursor), check the console logs, talk to AI on how to fix this (apparently it's many things to fix)
    - [] Add POST functionality to form: https://www.youtube.com/watch?v=dyD7NgGcphs&t=155s
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