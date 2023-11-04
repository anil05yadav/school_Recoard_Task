import React, { useState } from "react";
import CustomModal from "../../components/common/shared/CustomModal";
import { useSubjectSelector } from "../../../redux/selector";
// import TeacherModal from "../../components/common/teacherModal";
import SubjectModal from "../../components/common/subjectModal";


const SubjectRecoard = () => {
    const selector = useSubjectSelector();
    const [key, setKey] = useState(Math.random());
    const [modalDetail, setModalDetail] = useState({
        show: false,
        title: "",
        flag: "",
    });

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

            <button className="create_btn" onClick={() => {
                setModalDetail({ show: true, flag: "createStudent" });
                setKey(Math.random());
            }} >create Subject Details</button>
            <div className="commonBox_"></div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>class</th>
                            <th>languages</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {selector.length > 0 ?
                            <>
                                {selector?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.class}</td>
                                            <td>{item?.languages?.join(', ')}</td>
                                        </tr>
                                    )
                                })}
                            </>
                            : "no data found"}
                        {/* Add more rows and data as needed */}
                    </tbody>
                </table>
            </div>
        </div>
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
                        <SubjectModal onCloseModal={() => handleOnCloseModal()} />
                    </>
                    :
                    null
            }
        />
    </>
    )
}

export default SubjectRecoard;