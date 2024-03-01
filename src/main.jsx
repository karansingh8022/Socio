import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import {Protected} from "./components/Index.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import AllPostPage from "./pages/AllPostPage.jsx"
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import './index.css'
import { Provider } from 'react-redux'
import store from './utils/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Post from './pages/Post.jsx'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: (
            <Protected authentication={false}>
              <LoginPage/>
            </Protected>
        )
      },
      {
        path: "/signup",
        element:(
          <Protected authentication={false}>
            <SignupPage/>
          </Protected>
        ) 
      },
      {
        path: "/all-posts",
        element:(
          <Protected authentication={true}>
            {" "}
            <AllPostPage/>
          </Protected>
        )
      },
      {
        path: "/add-post",
        element:(
          <Protected authentication={true}>
            {" "}
            <AddPost/>
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication={true}>
            {" "}
            <EditPost/>
          </Protected>
        )
      }, 
      {
        path: "/post/:slug",
        element: <Post/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={appRouter}/>
    </Provider>
  </React.StrictMode>,
)
