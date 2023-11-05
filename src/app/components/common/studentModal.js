import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../../../redux/slice";

const StudentModal = (props) => {
    const dispatch = useDispatch();
    const [student, setStudent] = useState({
        name: '',
        age: '',
        image: '',
        class: '',
        rollNumber: '',
    });
    const [errors, setErrors] = useState({});



    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setStudent({
                ...student,
                image: e.target.result,
            });
          };
          reader.readAsDataURL(file);
        }
      };

    //Validate when starting page
    useEffect(() => {
        if (!student.name) {
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

        if (!student.age) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                age: 'Age is required',
            }));
        } else if (isNaN(student.age)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                age: 'Age must be a number',
            }));
        } else if (student.age < 3 || student.age > 30) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                age: 'Age allow between 3 to 30',
            }));
        }
        else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                age: '',
                error: '',
            }));
        }

        if (student.class < 1 || student.class > 15) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                class: 'Class allow between 1 to 15',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                class: '',
                error: '',
            }));
        }

        if (!student.rollNumber) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                rollNumber: 'Roll Number is required',
            }));
        } else if (isNaN(student.rollNumber)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                rollNumber: 'Roll Number must be a number',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                rollNumber: '',
                error: '',
            }));
        }
    }, [student]);


    //Inpuet change handle
    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    //Submitting the form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate again before submitting
        if (errors.name || errors.age || errors.class || errors.rollNumber) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                error: 'Please fix validation errors before submitting.',
            }));
            return;
        }
        const studentData = {
            name: student.name,
            age: student.age,
            image: student.image,
            class: student.class,
            rollNumber: student.rollNumber,
        };

        // Send the data to your backend for storage
        dispatch(addStudent(studentData));
        setStudent({
            name: '',
            age: '',
            image: '',
            class: '',
            rollNumber: '',
        });
        props.onCloseModal();

    };

    return (
        <>
            <div>
                <h2>Add Student Information</h2>
                <form onSubmit={handleSubmit}>
                    <div >
                        <label style={{ marginRight: '45px' }} >Name:</label> { }
                        <input type="text" className="form-input" name="name" value={student.name} onChange={handleChange} />
                        {errors.name && <span className="validationMsg">{errors.name}</span>}
                    </div>


                    <div>
                        <label style={{ marginRight: '58px' }} >Age:  </label>   { }
                        <input type="text" className="form-input" name="age" value={student.age} onChange={handleChange} />
                        {errors.age && <span className="validationMsg">{errors.age}</span>}
                    </div>

                    <div>
                        <label style={{ marginRight: '41px' }} >Image:</label> { }
                        <input type="file" className="form-input" accept="image/*" onChange={handleImageChange} />
                    </div>

                    <div>
                        <label style={{ marginRight: '50px' }} >Class:</label> { }
                        <input type="text" className="form-input" name="class" value={student.class} onChange={handleChange} />
                        {errors.class && <span className="validationMsg">{errors.class}</span>}
                    </div>

                    <div>
                        <label  >Roll Number:</label> { }
                        <input type="text" className="form-input" name="rollNumber" value={student.rollNumber} onChange={handleChange} />
                        {errors.rollNumber && <span className="validationMsg">{errors.rollNumber}</span>}
                        <br></br>
                        {errors.error && <span className="validationMsg">{errors.error}</span>}
                    </div>


                    <button className="loginBtnCommon" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default StudentModal;