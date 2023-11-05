import { createSlice } from '@reduxjs/toolkit'

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    student: [],
    teacher: [],
    subject: [],
  },
  reducers: {

    addStudent: (state, action) => {
      state.student = [...state.student, action.payload]
    },


    addTeacher: (state, action) => {
      state.teacher = [...state.teacher, action.payload]
    },

    addSubject: (state, action) => {
      state.subject = [...state.subject, action.payload]
    },

  },
})

// Action creators are generated for each case reducer function
export const { 
  addStudent,
  addTeacher,
  addSubject

 } = studentSlice.actions

export default studentSlice.reducer