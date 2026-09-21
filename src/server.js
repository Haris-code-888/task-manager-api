import 'dotenv/config';

import { Connecting } from './config/db.js';
import app from './app.js';


Connecting(process.env.MONGO_URI)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})