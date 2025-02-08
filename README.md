# MAI-Chat-App

## Setup Instructions  
=====================  
Follow these steps to set up and run the application locally:

1. **Clone the repository:**  
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**  
   ```bash
   cd MAI-CHAT-APP
   ```

3. **Create a `.env` file in the root project folder** and add the following variables:  
   ```env
   PORT=5000
   MONGO_URI=<Your MongoDB Connection String>
   JWT_SECRET=<Your JWT Secret>
   ```

4. **Install backend dependencies:**  
   ```bash
   npm install
   ```

5. **Start the backend server:**  
   ```bash
   npm start
   ```

6. **Navigate to the frontend directory:**  
   ```bash
   cd frontend
   ```

7. **Install frontend dependencies:**  
   ```bash
   npm install
   ```

8. **Start the frontend server:**  
   ```bash
   npm start
   ```

The backend server will be running on `http://localhost:5000`, and the frontend will be available at `http://localhost:3000`.

---