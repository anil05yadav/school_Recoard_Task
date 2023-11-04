import { useSelector } from "react-redux";

export const useStudentSelector = () => {
  return useSelector((state) => state.student)
}

export const useTeacherSelector = () => {
  return useSelector((state) => state.teacher)
}

export const useSubjectSelector = () => {
  return useSelector((state) => state.subject)
}