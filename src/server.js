import 'dotenv/config';

import { Connecting } from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 8080;   

Connecting(process.env.MONGO_URI)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});