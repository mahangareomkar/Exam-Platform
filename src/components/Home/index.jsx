import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUserDetails } from "../../redux/features/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar";

export const Home = () => {
    const [displayUserDetails,setDisplayUserDetails] = useState(false);
    const {name} = useSelector(state => state.user)
    const navigate = useNavigate();

    useEffect(()=>{
        if(name!==''){
            navigate("/exam/instructions")
        }
    },[])

    return (
        <>
        <Navbar />
        <div className="relative w-full h-[90vh] flex flex-col gap-2 justify-center items-center text-xl">
           <h1 className="font-medium">Welcome To,</h1>
           <h1 className="font-medium">Exam Platform</h1>
           <button className="w-fit font-medium text-white bg-blue-400 px-4 py-1 uppercase rounded-md hover:bg-blue-300 hover:cursor-pointer" onClick={()=>{
               setDisplayUserDetails(true)
            }
        }>Click Here to start the test</button>
            {displayUserDetails && <UserDetails setDisplayUserDetails={setDisplayUserDetails} />}
        </div>
        </>
    )
}

const UserDetails = ({setDisplayUserDetails}) => {
    const [username,setUsername] = useState("")
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(setUserDetails(username));
        navigate("exam/instructions/")
        setDisplayUserDetails(false)
        setUserDetails("");
    }

    return (
        <div className="absolute bg-white px-4 py-4 flex flex-col gap-4 border-2 rounded-xl shadow-md">
            <span className="pr-2 self-end hover:cusor-pointer" onClick={
                () => {
                    setDisplayUserDetails(false)
                }
            }>
            <svg width="30px" height="30pdx" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z" fill="#080341"></path> </g></svg>
            </span>
            <h1 className="text-xl font-semibold">Enter your details:</h1>
            <form onSubmit={submitHandler}>
                <div className="flex gap-2 text-lg font-medium">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="border-2 px-1" value={username} onChange={handleUsernameChange} />
                    <input type="submit" value="Continue" className="w-fit font-medium text-white bg-blue-400 px-4 py-1 uppercase rounded-md hover:bg-blue-300 hover:cursor-pointer"/>
                </div>
            </form>
        </div>
    )
}