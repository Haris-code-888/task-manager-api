import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

import { protect } from '../middleware/protect.js';
import { id_check, title } from '../middleware/validation.js';

const router = express.Router();

// Base Path: /api/tasks
router.route('/')
  .get(protect, getTasks)
  .post(protect, title, createTask);

router.route('/:task_id')
  .get(protect, id_check, getTaskById)
  .put(protect, id_check, updateTask)
  .delete(protect, id_check, deleteTask);

export default router;




// import express from 'express';
// import { getTasks } from '../controllers/taskController.js';
// import { protect } from '../middleware/protect.js';

// const router = express.Router();

// // router.get('/', protect, getTasks);

// // router.get("/tasks",protect)

// // router.get("/tasks/:task_id", protect, id_check, async(req,res)=>{
// //     const id = req.params.task_id


// //     // const task = data.find((t)=> t.id === Number(id))     Array Logic

// //     const task = await Task.findById(id).exec()  /// exec() command
    

// //     if(!task) {
// //         return res.status(404).json({message : "Not valid id"})
// //     }

// //     return res.status(200).json(task)

// // })

// router.post("/tasks", protect,title,)

    



// router.put("/tasks/:task_id",protect, id_check, )

// router.delete("/tasks/:task_id" ,protect, id_check, )

// export default router;