
import app from "../app.js"
import request from "supertest"


describe("Task Api", ()=>{

    describe("Testing Suite for Get / Routes",()=>{
        test("Get /tasks return a list of tasks" , async()=>{

            // const response = await request(app).get("/tasks")
            const response = await request(app).get("/")

            expect(response.status).toBe(200)
            expect(response.headers["content-type"]).toMatch(/json/);

    })
        test("Get/tasks return a tasks by id", async()=>{

            const response = await request(app).get("/api/tasks/:id")

            expect(response.status).toBe(200)
            // expect(response.get("Content-Type")).toBe("Application/json") wrong
            expect(response.headers["content-type"]).toMatch(/json/);

        })



    })

   


})