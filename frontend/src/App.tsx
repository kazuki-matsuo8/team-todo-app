import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import TodoPage from "./features/tasks/TodoPage";
import NewTaskPage from "./features/tasks/NewTaskPage";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoPage />}/>
          <Route path="/tasks/new" element={<NewTaskPage />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
