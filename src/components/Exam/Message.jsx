import { useNavigate } from "react-router-dom";
import { intructions } from "../../constants";
import { Navbar } from "../Navbar";

const Message = ({message}) => {

    return (
        <>
        <Navbar />
        <div className="py-4 px-8 text-md font-medium flex flex-col gap-2">
            <h1 className="text-xl font-bold uppercase text-center pb-4">{message}</h1>
        </div>
        </>
    )
}

export default Message;