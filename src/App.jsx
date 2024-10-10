import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <>
      <RouterProvider router={router} 
      // basename="/Exam-Platform/" 
      />
    </>
  );
}

export default App;
