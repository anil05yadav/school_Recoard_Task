import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSubject } from "../../../redux/slice";

const SubjectModal = (props) => {
    const dispatch = useDispatch();
    const [subject, setSubject] = useState({
        name: '',
        class: '',
        languages: [],
    });
    const [errors, setErrors] = useState({});

    //Validate when starting page
    useEffect(() => {
        if (!subject.name) {
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


        if (!subject.class) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                class: 'Class is required',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                class: '',
                error: '',
            }));
        }

        if (subject.languages.length === 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                languages: 'languages is required',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                languages: '',
                error: '',
            }));
        }

    }, [subject]);

    //Inpuet change handle
    const handleChange = (e) => {
        const { name, value, type, } = e.target;
        if (type === 'checkbox') {
          // Handle checkbox inputs for languages
          const languages = subject.languages.includes(value)
            ? subject.languages.filter((lang) => lang !== value)
            : [...subject.languages, value];
          setSubject({...subject, languages });
        } else {
          setSubject({...subject,[name]: value});
        }
      };

    //Submitting the form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate again before submitting
        if (errors.name || errors.class || errors.languages ) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                error: 'Please fix validation errors before submitting.',
            }));
            return;
        }
        const subjectData = {
            name: subject.name,
            class: subject.class,
            languages: subject.languages,
            
        };

        // Send the data to your backend for storage
        console.log('subject data to be saved:', subjectData);
        dispatch(addSubject(subjectData));
        setSubject({
            name: '',
            class: '',
            languages: [],
        });
        props.onCloseModal();

    };

    return (
        <>
            <div>
                <h2>Add Subject Information</h2>
                <form onSubmit={handleSubmit}>
                    <div >
                        <label style={{ marginRight: '15px' }} >Name:</label> { }
                        <input type="text" className="form-input" name="name" value={subject.name} onChange={handleChange} />
                        {errors.name && <span className="validationMsg">{errors.name}</span>}
                    </div>

                    <div>
                        <label style={{ marginRight: '20px' }} >Class:  </label>   { }
                        <input type="text" className="form-input" name="class" value={subject.class} onChange={handleChange} />
                        {errors.class && <span className="validationMsg">{errors.class}</span>}
                    </div>


                

                    <label>Language(s):</label>
                    <div>
                        <label>
                            <input
                            className="form-input"
                                type="checkbox"
                                name="languages"
                                value="English"
                                checked={subject.languages.includes('English')}
                                onChange={handleChange}
                            /> English
                        </label>
                        <label>
                            <input
                            className="form-input"
                                type="checkbox"
                                name="languages"
                                value="Hindi"
                                checked={subject.languages.includes('Hindi')}
                                onChange={handleChange}
                            /> Hindi
                        </label>
                        <label>
                            <input
                            className="form-input"
                                type="checkbox"
                                name="languages"
                                value="Math"
                                checked={subject.languages.includes('Math')}
                                onChange={handleChange}
                            /> Math
                        </label><br></br>
                        {errors.languages && <span className="validationMsg">{errors.languages}</span>}
                        <br></br>
                        {errors.error && <span className="validationMsg">{errors.error}</span>}
                    </div>

                    <button className="loginBtnCommon" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default SubjectModal;