import React, { useState } from "react"
import CustomModal from "../../components/common/shared/CustomModal";
import StudentModal from "../../components/common/studentModal";
import { useStudentSelector } from "../../../redux/selector";

const StudentRecord = () => {
    const selector = useStudentSelector();
    const [searchStudent, setSearchStudent] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [key, setKey] = useState(Math.random());
    const [modalDetail, setModalDetail] = useState({
        show: false,
        title: "",
        flag: "",
    });

   //Filter setudent recoard by search
    const filteredStudents = selector.filter((student) =>
        student.name.toLowerCase().includes(searchStudent.toLowerCase())
    );


    //Filter student recoard by class
    const filterStudentbyClass = selector.filter((student) =>
        student.class === selectedClass
    );


    //Find class list
    const findClasses =(data)  =>{
        const classSet = new Set();
        data.forEach((item) => {
            classSet.add(item.class);
        });
        return Array.from(classSet);
    }
    const differentClasses = findClasses(selector);


    //Create for close the modal.
    const handleOnCloseModal = () => {
        setModalDetail({
            show: false,
            title: "",
            flag: "",
        });
        setKey(Math.random());
    };

    return (
        <>
            <div className="App">
                <div className="head_button">
                    <div>
                        <input
                            type="text"
                            placeholder="Search by student name"
                            value={searchStudent}
                            onChange={(e) => setSearchStudent(e.target.value)}
                        />
                    </div>
                    <div>
                        <select onChange={(e) => setSelectedClass(e.target.value)}>
                            <option value="">Selecct Classes</option>
                            {differentClasses.map((cls) => (
                                <option key={cls} value={cls}>
                                    {cls}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button className="create_btn_student" onClick={() => {
                            setModalDetail({ show: true, flag: "createStudent" });
                            setKey(Math.random());
                        }} >create student Details</button>
                    </div>

                </div>
                <div className="commonBox_"></div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Image</th>
                                <th>Class</th>
                                <th>Roll Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedClass ?
                                <>
                                    {filterStudentbyClass.length > 0 ?
                                        <>
                                            {filterStudentbyClass?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.age}</td>
                                                        <td>{item.image}</td>
                                                        <td>{item.class}</td>
                                                        <td>{item.rollNumber}</td>
                                                    </tr>
                                                )
                                            })}
                                        </>
                                        : "no data found"
                                    }

                                </>
                                :
                                <>
                                    {searchStudent ?
                                        <>
                                            {filteredStudents.length > 0 ?
                                                <>
                                                    {filteredStudents?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.age}</td>
                                                                <td>{item.image}</td>
                                                                <td>{item.class}</td>
                                                                <td>{item.rollNumber}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </>
                                                : "no data found"
                                            }
                                        </>
                                        :
                                        <>
                                            {selector.length > 0 ?
                                                <>
                                                    {selector?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.age}</td>
                                                                <td>{item.image}</td>
                                                                <td>{item.class}</td>
                                                                <td>{item.rollNumber}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </>
                                                : "no data found"
                                            }
                                        </>
                                    }
                                </>}

                        </tbody>
                    </table>
                </div>
            </div >
            <CustomModal
                key={key}
                showModal={modalDetail.show}
                setShowModal={setModalDetail}
                title={modalDetail.title}
                dialogClassName="modal-dialog-centered"
                backdrop="static"
                ids={"createStudent"}
                onCloseModal={() => handleOnCloseModal()}
                showCloseBtn={"show"}
                header={
                    modalDetail.flag === "createStudent" ?
                        <>
                            <header></header>
                        </>
                        : null
                }
                child={
                    modalDetail.flag === "createStudent" ?
                        <>
                            <StudentModal onCloseModal={() => handleOnCloseModal()} />
                        </>
                        :
                        null
                }
            />
        </>
    )
}

export default StudentRecord;