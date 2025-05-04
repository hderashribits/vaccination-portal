import 'dotenv/config';  // Load environment variables
import app from './app.js';

const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
