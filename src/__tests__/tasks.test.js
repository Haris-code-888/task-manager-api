
// import app from "../app.js"
// import request from "supertest"


// describe("Task Api", ()=>{

//     describe("Testing Suite for Get / Routes",()=>{
//         test("Get /tasks return a list of tasks" , async()=>{

//             // const response = await request(app).get("/tasks")
//             const response = await request(app).get("/")

//             expect(response.status).toBe(200)
//             expect(response.headers["content-type"]).toMatch(/json/);

//     })
//         test("Get/tasks return a tasks by id", async()=>{

//             const response = await request(app).get("/api/tasks/:id")

//             expect(response.status).toBe(200)
//             // expect(response.get("Content-Type")).toBe("Application/json") wrong
//             expect(response.headers["content-type"]).toMatch(/json/);

//         })



//     })

   


// })



import request from "supertest";
import app from "../app.js";
import { Task } from "../models/Task.js"; // Adjust relative path if needed

// 1. Mock Mongoose Model Methods
jest.mock("../models/Task.js", () => ({
  Task: {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  },
}));

// 2. Mock Middleware (protect, id_check, title)
// Adjust the file path below to match where your middleware file is located
jest.mock("../middleware/protect.js", () => ({
  protect: (req, res, next) => {
    req.user = { id: "user123" };
    next();
  },
}));

// 3. Mock Validation Middleware file (contains 'id_check' and 'title')
// Update the path below to match where id_check and title are actually exported
jest.mock("../middleware/validation.js", () => ({
  id_check: (req, res, next) => next(),
  title: (req, res, next) => next(),
}));

describe("Task API Endpoints (/api/tasks)", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Resets mock invocation counts between tests
  });

  /* ------------------------------------
     GET /api/tasks
  ------------------------------------ */
  describe("GET /api/tasks", () => {
    test("should return 200 and all tasks for authenticated user", async () => {
      const mockTasks = [
        { _id: "task1", task: "Complete node tests", user: "user123" },
      ];
      Task.find.mockResolvedValue(mockTasks);

      const response = await request(app)
        .get("/api/tasks")
        .expect(200);

      expect(Task.find).toHaveBeenCalledWith({ user: "user123" });
      expect(response.body).toEqual(mockTasks);
    });
  });

  /* ------------------------------------
     POST /api/tasks
  ------------------------------------ */
  describe("POST /api/tasks", () => {
    test("should create a new task and return 201", async () => {
      const taskPayload = { task: "Learn Jest & Supertest" };
      const createdTask = { _id: "task99", ...taskPayload, user: "user123" };

      Task.create.mockResolvedValue(createdTask);

      const response = await request(app)
        .post("/api/tasks")
        .send(taskPayload)
        .expect(201);

      expect(Task.create).toHaveBeenCalledWith({
        task: "Learn Jest & Supertest",
        user: "user123",
      });
      expect(response.body).toEqual({
        message: "Created",
        result: createdTask,
      });
    });
  });

  /* ------------------------------------
     PUT /api/tasks/:task_id
  ------------------------------------ */
  describe("PUT /api/tasks/:task_id", () => {
    test("should update task and return 200 when task exists", async () => {
      const updatedTask = { _id: "task1", task: "Updated Task Name", user: "user123" };
      Task.findOneAndUpdate.mockResolvedValue(updatedTask);

      const response = await request(app)
        .put("/api/tasks/task1")
        .send({ task: "Updated Task Name" })
        .expect(200);

      expect(Task.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: "task1", user: "user123" },
        { task: "Updated Task Name" },
        { new: true, runValidators: true }
      );
      expect(response.body).toEqual({
        message: "Updated data",
        data: updatedTask,
      });
    });

    test("should return 404 if task to update does not exist", async () => {
      Task.findOneAndUpdate.mockResolvedValue(null);

      const response = await request(app)
        .put("/api/tasks/nonexistent_id")
        .send({ task: "Updated Task Name" })
        .expect(404);

      expect(response.body).toEqual({ message: "Not Found!!" });
    });
  });

  /* ------------------------------------
     DELETE /api/tasks/:task_id
  ------------------------------------ */
  describe("DELETE /api/tasks/:task_id", () => {
    test("should delete task and return 200", async () => {
      const deletedTask = { _id: "task1", task: "Task to delete", user: "user123" };
      Task.findOneAndDelete.mockResolvedValue(deletedTask);

      const response = await request(app)
        .delete("/api/tasks/task1")
        .expect(200);

      expect(Task.findOneAndDelete).toHaveBeenCalledWith({
        _id: "task1",
        user: "user123",
      });
      expect(response.body).toEqual({
        message: "Deleted Succesfully",
        data: deletedTask,
      });
    });

    test("should return 404 if task to delete does not exist", async () => {
      Task.findOneAndDelete.mockResolvedValue(null);

      const response = await request(app)
        .delete("/api/tasks/nonexistent_id")
        .expect(404);

      expect(response.body).toEqual({ message: "Not Found!!" });
    });
  });
});