import { Route, Routes } from "react-router-dom";
import * as Containers from "../app/containers";
import * as Layouts from "../app/layouts"
// import PrivateCheck from "../app/layouts/PrivateCheck";


const Router = () => {

    return (
        <>
            <Routes>
                <Route element={<Layouts.MainLayout />}>
                    <Route path="/" element={<Containers.Home />} />
                    <Route path="/student" element={<Containers.StudentRecord />} />
                    <Route path="/teacher" element={<Containers.TeacherRecoard />} />
                    <Route path="/subject" element={<Containers.SubjectRecoard />} />
                </Route>
            </Routes>
        </>
    );
}

export default Router;