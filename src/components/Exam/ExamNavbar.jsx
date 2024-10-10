import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { tick } from "../../redux/features/examSlice";

const ExamNavbar = () => {
    const dispatch = useDispatch();
    const {name} = useSelector(state => state.user)
    const {isRunning,time} = useSelector(state => state.exam);

    useEffect(()=>{
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
              dispatch(tick());
            }, 1000);
          }

          return ()=> clearInterval(interval);
    },[isRunning,time,dispatch])
    
    return (
        <nav className="p-2 text-lg text-white font-medium bg-blue-400 flex justify-between items-center">
            <h1>Hello {name}</h1>
            <h1>Time Remaining : {`${Math.floor(time/60)}:${time%60}`}</h1>
        </nav>
    )
}

export default ExamNavbar;