import React, { useEffect, useRef, useState } from 'react';
import ExamNavbar from './ExamNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { incrementViolations } from '../../redux/features/examSlice';

const WarningModel = ({ goFullscreen, setDisplayWarning }) => {
    return (
        <div className='bg-white shadow-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center gap-4 px-10 py-6 text-lg font-medium'>
            You have violated the rules
            <button className="w-fit font-medium text-white bg-blue-400 px-4 py-1 uppercase rounded-md hover:bg-blue-300 hover:cursor-pointer" onClick={() => {
                goFullscreen();
                setDisplayWarning(false)
            }
            }>Continue</button>
        </div>
    )
}

const Exam = () => {
    const screenRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { name } = useSelector(state => state.user);
    const { violations } = useSelector(state => state.exam);
    const [displayWarning, setDisplayWarning] = useState(false);

    const goFullscreen = () => {
        if (screenRef.current) {
            if (screenRef.current.requestFullscreen) {
                screenRef.current.requestFullscreen();
            } else if (screenRef.current.mozRequestFullScreen) {
                screenRef.current.mozRequestFullScreen();
            } else if (screenRef.current.webkitRequestFullscreen) {
                screenRef.current.webkitRequestFullscreen();
            } else if (screenRef.current.msRequestFullscreen) {
                screenRef.current.msRequestFullscreen();
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                console.log("Exited fullscreen");
                dispatch(incrementViolations());
            }

            if (violations < 1 && !document.fullscreenElement) {
                setDisplayWarning(true);
            }else if(violations >= 1 && !document.fullscreenElement){
                navigate("/banned")
            }

            return;
        };


        // Add event listener for fullscreen change
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        return () => {
            // Clean up the event listener on unmount
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, [dispatch,violations]);

    useEffect(() => {
        console.log(violations)
        if (name === '') {
            navigate("/");
        }else if(violations>=1){
            navigate("/banned")
        }
        goFullscreen();
    }, [name, navigate]);

    return (
        <div ref={screenRef} className='h-screen relative bg-white'>
            <ExamNavbar />
            <Outlet />
            {
                displayWarning && <WarningModel goFullscreen={goFullscreen} setDisplayWarning={setDisplayWarning} />
            }
        </div>
    );
};

export default Exam;
