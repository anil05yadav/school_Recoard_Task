import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTeacher } from "../../../redux/slice";

const TeacherModal = (props) => {
    console.log("props", props)
    const dispatch = useDispatch();
    const [teacher, setTeacher] = useState({
        name: '',
        age: '',
        image: '',
        sex: '',
    });
    const [errors, setErrors] = useState({});

    //Validate when starting page
    useEffect(() => {
        if (!teacher.name) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: 'Name is required',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: '',
                error: '',
            }));
        }

        if (!teacher.age) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                age: 'Age is required',
            }));
        } else if (isNaN(teacher.age)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                age: 'Age must be a number',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                age: '',
                error: '',
            }));
        }

        if (!teacher.sex) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                sex: 'sex is required',
            }));

        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                sex: '',
                error: '',
            }));
        }
    }, [teacher]);

    //Inpuet change handle
    const handleChange = (e) => {
        setTeacher({
            ...teacher,
            [e.target.name]: e.target.value,
        });
    };

    //Submitting the form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate again before submitting
        if (errors.name || errors.age || errors.rollNumber) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                error: 'Please fix validation errors before submitting.',
            }));
            return;
        }
        const teacherData = {
            name: teacher.name,
            age: teacher.age,
            image: teacher.image,
            sex: teacher.sex,
        };

        // Send the data to your backend for storage
        console.log('teacher data to be saved:', teacherData);
        dispatch(addTeacher(teacherData));
        setTeacher({
            name: '',
            age: '',
            image: '',
            sex: '',
        });
        props.onCloseModal();

    };

    return (
        <>
            <div>
                <h2>Add Teacher Information</h2>
                <form onSubmit={handleSubmit}>
                    <div >
                        <label style={{ marginRight: '15px' }} >Name:</label> { }
                        <input type="text" className="form-input" name="name" value={teacher.name} onChange={handleChange} />
                        {errors.name && <span className="validationMsg">{errors.name}</span>}
                    </div>

                    <div>
                        <label style={{ marginRight: '28px' }} >Age:  </label>   { }
                        <input type="text" className="form-input" name="age" value={teacher.age} onChange={handleChange} />
                        {errors.age && <span className="validationMsg">{errors.age}</span>}
                    </div>

                    <div>
                        <label style={{ marginRight: '11px' }} >Image:</label> { }
                        <input type="text" className="form-input" name="image" value={teacher.image} onChange={handleChange} />
                    </div>
                 
                    <div>
                        <label htmlFor="sex" style={{ marginRight: '38px' }} >Sex:</label>
                        <select
                            className="form-input"
                            name="sex"
                            value={teacher.sex}
                            onChange={handleChange}
                        
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.sex && <span className="validationMsg">{errors.sex}</span>}
                        <br></br>
                        {errors.error && <span className="validationMsg">{errors.error}</span>}
                    </div>

                    <button className="loginBtnCommon" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default TeacherModal;