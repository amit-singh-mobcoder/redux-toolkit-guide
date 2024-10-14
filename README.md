# Redux ToolKit Guide
Redux Toolkit (RTK) is the official, recommended approach for writing Redux logic. It simplifies the process of managing application state in JavaScript applications by addressing common pain points associated with Redux.

## Common terms in redux
`Store`: An Object that holds the applications state data.

`Action`: What you wanna do, eg: event click

`Reducer`:  Describes how your action transfers state into the next state. It checks which action took place and based on the action it updates the store.

`Dispatch`: Way how we execute the action. eg: Dispatch the action to the reducer. Then reducer will check what to do and the store gets updated.

## Usage Summary
### Install Redux Toolkit and React-Redux
Add the Redux Toolkit and React-Redux packages to your project: 
```javascript
npm install @reduxjs/toolkit react-redux
```

### Create a Redux Store
Create a file named `src/redux/store.js`. Import the `configureStore` API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:
```javascript
// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {}
})
```
This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.

### Provide the Redux Store to React
Once the store is created, we can make it available to our React components by putting a React-Redux `<Provider>` around our application in `src/index.js`. Import the Redux store we just created, put a `<Provider>` around your `<App>`, and pass the store as a prop:
```javascript
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// import these two
import store from './app/store'
import { Provider } from 'react-redux'

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

### Create a Redux State Slice
Add a new file named `src/features/counter/counterSlice.js`. In that file, import the `createSlice` API from Redux Toolkit.

Creating a slice requires a string `name` to identify the slice, an `initial state` value, and o`ne or more reducer functions` to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.
```javascript
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

### Add Slice Reducers to the Store
Next, we need to import the reducer function from the counter slice and add it to our store. By defining a field inside the `reducer`parameter, we tell the store to use this slice reducer function to handle all updates to that state.
```javascript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice' // see here

export default configureStore({
  reducer: {
    counter: counterReducer // see here
  }
})
```

### Use Redux State and Actions in React Components
Now we can use the React-Redux hooks to let React components interact with the Redux store. We can read data from the store with `useSelector`, and dispatch actions using `useDispatch`. Create a `src/features/counter/Counter.js` file with a `<Counter>` component inside, then import that component into `App.js` and render it inside of `<App>`.
```javascript
import React from 'react'
import {increment, decrement} from '../features/counter/counterSlice'
import { useDispatch, useSelector } from 'react-redux'

const Counter = () => {

    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()

    const handleIncreaseCount = () => {
        dispatch(increment())
    }

    const handleDecreaseCount = () => {
        dispatch(decrement())
    }

  return (
    <div>
        <p>Count : {count}</p>
        <div>
            <button onClick={handleIncreaseCount}>Increase count</button>
            <button onClick={handleDecreaseCount}>Decrease count</button>
        </div>

    </div>
  )
}

export default Counter
```