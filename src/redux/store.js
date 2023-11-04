
// import { configureStore } from '@reduxjs/toolkit'
// // import counterReducer from '../features/counter/counterSlice'
// import studentSlice from '../redux/slice'

// export default configureStore({
//   reducer: {
//     student: studentSlice,
//   },
// })

import { configureStore } from '@reduxjs/toolkit'
import studentSlice from '../redux/slice'
import createSagaMiddleware from 'redux-saga';
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const persistConfig = {
  key: 'root',
  transforms: [
    encryptTransform({
      secretKey: '4226452948404D635166546A576D5A7134743777217A25432A462D4A614E6452',
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  storage,
}


const persistedReducer = persistReducer(persistConfig, studentSlice)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}).concat(middleware),
})

sagaMiddleware.run(rootSaga)

export default store;
export const persistor = persistStore(store);