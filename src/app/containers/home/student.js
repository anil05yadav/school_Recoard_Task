import React, { useEffect, useState } from "react"
import CustomModal from "../../components/common/shared/CustomModal";
import StudentModal from "../../components/common/studentModal";
import { useStudentSelector } from "../../../redux/selector";

const StudentRecord = () => {
    const selector = useStudentSelector();
    const [data, setData] = useState(selector);
    const [searchStudent, setSearchStudent] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [key, setKey] = useState(Math.random());
    const [modalDetail, setModalDetail] = useState({
        show: false,
        title: "",
        flag: "",
    });

    useEffect(() => {
        let filteredData = selector;
        if (searchStudent) {
            filteredData = selector.filter((student) =>
                student.name.toLowerCase().includes(searchStudent.toLowerCase()));
        }

        if (selectedClass) {
            filteredData = selector.filter((student) => student.class === selectedClass);
        }
        setData(filteredData);

    }, [searchStudent, selector, selectedClass,])


    //Find class list
    const findClasses = (data) => {
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
                            <option value="">Select Classes</option>
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
                            {data.length > 0 ?
                                <>
                                    {data?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.age}</td>
                                                <td>{item.image.slice(0, 50)}</td>
                                                <td>{item.class}</td>
                                                <td>{item.rollNumber}</td>
                                            </tr>
                                        )
                                    })}
                                </>
                                : "no data found"
                            }
                           
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