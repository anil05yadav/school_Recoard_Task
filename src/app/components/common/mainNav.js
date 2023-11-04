import React from "react"
import { useNavigate } from "react-router-dom";


const MainNav = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="App">
                <button className='stu_btn' onClick={() => navigate("/student")}>Student Details</button>
                <button className='stu_btn' onClick={() => navigate("/teacher")}>Teacher Details</button>
                <button className='stu_btn' onClick={() => navigate("/subject")}>Subject Details</button>
            </div>
        </>
    )

}

export default MainNav;