
import { Task } from "../models/Task.js";


// export const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ user: req.user.id });
//     return res.status(200).json(tasks);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const getTasks = async (req, res) => {
  try {
    // 1. Extract query parameters with sensible defaults
    const { completed, page = 1, limit = 10 } = req.query;

    // 2. Base filter (scope to the authenticated user)
    const filter = { user: req.user.id };

    // 3. Apply optional filtering (check string explicitly since boolean comes as string)
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    // 4. Calculate skip formula: (page - 1) * limit
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * limitNum;

    // 5. Query Mongoose with filtering, skip, and limit
    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async(req,res)=>{

    const tasks = await Task.findOne({ _id: req.params.task_id, user: req.user.id });  // check this not done by you

    return res.status(200).json(tasks)

}


export const createTask = async(req,res)=>{

        // const data = req.body;
        const taskData = { ...req.body, user: req.user.id };

        const result =  await Task.create(taskData )
        return res.status(201).json({message : "Created", result})

}

export const updateTask = async(req,res)=>{

   
            const id = req.params.task_id
            const data = await Task.findOneAndUpdate(
                { _id: id, user: req.user.id },
                req.body,
                { new: true, runValidators: true }
             );
            
            // const data = await Task.findOneAndUpdate(id, Data, )

             if (!data){
            return res.status(404).json({message:"Not Found!!"})
        }
            return res.status(200).json({message:"Updated data",data})

}


export const deleteTask = async(req,res)=>{
   
        const id = req.params.task_id

        // const data = await Task.findByIdAndDelete(id)

        const data = await Task.findOneAndDelete({ _id: id, user: req.user.id });

        if (!data){
            return res.status(404).json({message:"Not Found!!"})
        }
        return res.status(200).json({message: "Deleted Succesfully",data})


}



