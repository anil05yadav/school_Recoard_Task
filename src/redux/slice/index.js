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
      console.log(action, "action")
      //   state.value += action.payload
      state.student = [...state.student, action.payload]
    },


    addTeacher: (state, action) => {
      console.log(action, "action")
      //   state.value += action.payload
      state.teacher = [...state.teacher, action.payload]
    },

    addSubject: (state, action) => {
      console.log(action, "action")
      //   state.value += action.payload
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