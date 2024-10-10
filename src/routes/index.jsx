import { createBrowserRouter } from "react-router-dom"
import { Home } from "../components/Home"
import Exam from "../components/Exam"
import Instructions from "../components/Exam/Intructions"
import ExamArea from "../components/Exam/ExamArea"
import Message from "../components/Exam/Message"

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home />
    },
    {
        path:"exam/",
        element: <Exam />,
        children:[
            {
                path:"instructions/",
                element: <Instructions />,
            },
            {
                path:"test/",
                element: <ExamArea />,
            },
        ]
    },
    {
        path:"banned/",
        element: <Message message={"You Have Been Banned from the Test"} />,
    },
    {
        path:"submitted/",
        element: <Message message={"You Have Been Successfully Submitted the Test"} />,
    },
])