# Guided Project: Task Manager REST API

**Goal:** Build a working backend from scratch, one checkpoint at a time, so you get real muscle memory instead of copy-paste pattern-matching.

**How to use this:**
1. Read the checkpoint.
2. Try to build it yourself — even if it takes an hour and looks ugly.
3. Only use the "If you're stuck" resource *after* you've genuinely attempted it.
4. Don't move to the next checkpoint until the current one actually runs.

Tech stack: Node.js + Express + MongoDB (Mongoose) + JWT auth. This matches what you've already studied conceptually, so this project is where it becomes real.

---

## Checkpoint 0 — Project Setup
**Build:**
- A new folder, `npm init -y`
- Install `express`, `nodemon`, `dotenv`
- A single `server.js` that starts an Express server on a port from `.env` and logs "Server running" to the console
- One test route: `GET /` returns `{ message: "API is alive" }`

**Done when:** You can run `npm run dev` and hit `localhost:5000/` in the browser or Postman and see the JSON.

**If you're stuck:** [Express official "Hello World" guide](https://expressjs.com/en/starter/hello-world.html)

---

## Checkpoint 1 — Task Model + In-Memory CRUD (no DB yet)
Skip the database for now — get comfortable with routes and request/response first.

**Build:**
- Routes: `GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`
- Store tasks in a plain JS array in memory (they'll disappear on restart — that's fine for now)
- Each task: `{ id, title, description, completed, createdAt }`
- Use `express.json()` middleware so you can read `req.body`

**Done when:** You can create, list, update, and delete tasks through Postman/Thunder Client and see the array change.

**If you're stuck:** [freeCodeCamp — Express CRUD routes with in-memory array](https://www.freecodecamp.org/news/build-a-crud-api-with-node-js/)

---

## Checkpoint 2 — Connect MongoDB with Mongoose
**Build:**
- Set up a free MongoDB Atlas cluster (or local MongoDB)
- Connect via Mongoose in a separate `config/db.js`
- Create a `Task` schema/model: `title` (required string), `description` (string), `completed` (boolean, default false), `createdAt` (date, default now)
- Replace your in-memory array logic in each route with real Mongoose calls (`Task.find()`, `Task.findById()`, `Task.create()`, `Task.findByIdAndUpdate()`, `Task.findByIdAndDelete()`)

**Done when:** Restarting your server doesn't wipe your tasks — they persist in MongoDB Atlas (you can check the Atlas dashboard).

**If you're stuck:**
- [MongoDB Atlas setup guide](https://www.mongodb.com/docs/atlas/getting-started/)
- [Mongoose docs — Models](https://mongoosejs.com/docs/models.html)

---

## Checkpoint 3 — Validation & Error Handling
**Build:**
- Return `400` with a clear message if `title` is missing on create
- Return `404` if a task ID doesn't exist (for GET/PUT/DELETE by id)
- Wrap async route handlers so unexpected errors don't crash the server — add a simple centralized error-handling middleware at the bottom of `server.js`
- Handle invalid MongoDB ObjectId format gracefully (don't let it 500 crash)

**Done when:** Hitting bad requests (missing title, fake id, malformed id) gives clean JSON errors, not a stack trace or crash.

**If you're stuck:** [Express error handling docs](https://expressjs.com/en/guide/error-handling.html)

---

## Checkpoint 4 — User Auth (JWT)
This is the checkpoint most junior candidates can't actually explain in interviews — so building it yourself matters a lot here.

**Build:**
- `User` model: `email`, `password` (hashed with bcrypt)
- `POST /auth/register` — hash password, save user
- `POST /auth/login` — compare password, return a JWT
- Middleware `protect` that reads the `Authorization: Bearer <token>` header, verifies the JWT, and blocks the request if invalid
- Apply `protect` to all `/tasks` routes

**Done when:** You can't access `/tasks` without a valid token, and login gives you one that works.

**If you're stuck:**
- [bcrypt basics](https://www.npmjs.com/package/bcryptjs)
- [JWT auth in Express — Dave Gray's tutorial series](https://www.youtube.com/watch?v=2jqok-WgelI)

---

## Checkpoint 5 — Ownership + Final Polish
**Build:**
- Add a `user` field on `Task` referencing the owning user (`ObjectId`, `ref: 'User'`)
- When creating a task, attach the logged-in user's id from the JWT payload
- `GET /tasks` should only return the logged-in user's own tasks
- Add a `README.md` explaining routes, setup, and a couple of example requests

**Done when:** Two different logged-in users only ever see their own tasks, and a stranger could clone your repo and run it from your README alone.

**If you're stuck:** [Mongoose populate & references](https://mongoosejs.com/docs/populate.html)

---

## After this project
Once all 5 checkpoints work end-to-end, you'll have a real, defensible project for interviews — not something you can only describe theoretically. Good next steps from here: add pagination/filtering to `GET /tasks`, write a few tests with Jest + Supertest, or deploy it (you've already studied the deployment concepts, so this closes that loop too).
