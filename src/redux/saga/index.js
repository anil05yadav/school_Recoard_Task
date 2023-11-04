import { all,  spawn, takeLatest } from "redux-saga/effects";


function* userLogin(action) {
  }
  

function* studentSaga() {
    yield all([
      takeLatest('student/addStudent', userLogin),
    ])
  }
  

export default function* rootSaga() {
    yield all([
        spawn(studentSaga),
       
    ]);
}
