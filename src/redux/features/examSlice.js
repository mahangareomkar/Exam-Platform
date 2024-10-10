import { createSlice} from "@reduxjs/toolkit";
import { questions } from "../../constants";
import reducer from "./userSlice";

const initialState = {
    answers : [],
    violations: 0,
    attempted: false,
    score: null,
    banned: false,
    isRunning: false,
    time: 30,
};

const examSlice = createSlice({
    name:"exam",
    initialState,
    reducers: {
        incrementViolations : (state) => {
            console.log(state.violations)

            state.violations++;
            console.log(state.violations)
            if(state.violations>1){
                state.banned = true;
            }
        },
        submitExam : (state,action) => {
            state.answers = action.payload;
            state.attempted = true;
            let sc = 0;

            for(let i=0;i<questions.length;i++){
                if(questions[i].answer === action.payload[i]){
                    sc++;
                }
            }

            state.score = sc;
        },
        tick: (state) => {
            console.log(state.time)
            state.time = state.isRunning && state.time > 0 ? state.time - 1: state.time;
            state.isRunning = state.time===0?false:true;
        },
        startTimer: (state) => {
            state.isRunning = true;
        }

    }
})

export const {incrementViolations,submitExam,tick,startTimer} = examSlice.actions;

export default examSlice.reducer;