import { useNavigate } from "react-router-dom";
import { intructions } from "../../constants";
import { useDispatch } from "react-redux";
import { startTimer } from "../../redux/features/examSlice";

const Instructions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="py-4 px-8 text-md font-medium flex flex-col gap-2">
            <h1 className="text-xl font-bold uppercase text-center pb-4">Instructions</h1>
            <ol class="list-decimal"> 

            {
                intructions.map(instruction => {
                    return (
                        <li className="py-2">
                            {instruction}
                        </li>
                    )
                })
            }
            </ol>
            <button className="w-fit font-medium text-white bg-blue-400 px-4 py-1 mt-4 uppercase rounded-md hover:bg-blue-300 hover:cursor-pointer self-center" onClick={()=>{
                dispatch(startTimer());
                navigate("/exam/test");
            }
        }>Start Exam</button>
        </div>
    )
}

export default Instructions;