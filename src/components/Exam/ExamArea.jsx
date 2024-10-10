import { useEffect, useState } from "react";
import { questions } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { startTimer, submitExam } from "../../redux/features/examSlice";
import { useNavigate } from "react-router-dom";

const ExamArea = () => {
    const [question, setQuestion] = useState(questions)
    const [index, setIndex] = useState(0);
    const [selectedOption,setSelectedOption] = useState("")
    const [userAnswers,setUserAnswers] = useState(Array.apply('',Array(10)))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isRunning} = useSelector(state=>state.exam)

    const handleOptionSelect = (e) => {
        setSelectedOption(e.target.innerText)
        let temp = userAnswers;
        temp[index] = e.target.innerText.split(']')[0]
        // console.log(temp[index],e.target.innerText);
        // console.log(temp)
        // console.log(index)
        setUserAnswers(temp);
    }

    const submitTestHandler = () => {
        dispatch(submitExam(userAnswers));
        console.log(userAnswers)
        navigate("/submitted")
    }

    useEffect(()=>{
        if(!isRunning){
            submitTestHandler();
        }
    },[isRunning])

    return (
        <div>
            {question && index<question?.length &&
                <div className="flex flex-col justify-center items-center h-[90vh] text-lg gap- 8">
                    <h1 className="font-bold mb-8">
                        Q. {question[index]?.question}
                    </h1>
                    <div className="grid grid-cols-2 gap-4">
                        <h1 className={`col-span-1 ${selectedOption===`A] ${question[index]?.options.A}`?'bg-blue-400':''} font-medium border-2 rounded-full px-4 py-2`} onClick={handleOptionSelect}>{`A] ${question[index].options.A}`}</h1>
                        <h1 className={`col-span-1 ${selectedOption===`B] ${question[index]?.options.B}`?'bg-blue-400':''} font-medium border-2 rounded-full px-4 py-2`} onClick={handleOptionSelect}>{`B] ${question[index].options.B}`}</h1>
                        <h1 className={`col-span-1 ${selectedOption===`C] ${question[index]?.options.C}`?'bg-blue-400':''} font-medium border-2 rounded-full px-4 py-2`} onClick={handleOptionSelect}>{`C] ${question[index].options.C}`}</h1>
                        <h1 className={`col-span-1 ${selectedOption===`D] ${question[index]?.options.D}`?'bg-blue-400':''} font-medium border-2 rounded-full px-4 py-2`} onClick={handleOptionSelect}>{`D] ${question[index].options.D}`}</h1>
                    </div>

                </div>
            }
            <div className="flex justify-between items-center px-12">
                {index===0 && 
                    <button className="bg-blue-300 px-4 py-2 rounded-lg hover:cursor-pointer" disabled>Previous</button>    
                }

                {
                    index>0 &&
                    <button className="bg-blue-400 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-600" onClick={()=>{
                        setIndex(index-1);
                    }}>Previous</button>
                }

                {index>=question?.length-1 && 
                    <button className="bg-blue-300 px-4 py-2 rounded-lg hover:cursor-pointer" onClick={submitTestHandler}>Submit</button>    
                }

                {
                    index<question?.length-1 &&
                    <button className="bg-blue-400 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-600" onClick={()=>{
                        setIndex(index+1);
                    }}>Next</button>
                }
            </div>
        </div>
    )
}

export default ExamArea;