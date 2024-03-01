import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./utils/authSlice";
import { Header, Footer } from "./components/Index.jsx";
import { Provider } from "react-redux";
import store from "./utils/store";
import { Outlet } from "react-router-dom"



function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // authService.createSession()
    //   .then(() => {
        authService.getCurrentUser()
          .then((userData) => {
            if (userData) {
              dispatch(login(userData));
            }
            else {
              console.log(`the user is not logged in`);
              dispatch(logout());
            }
          })
          .finally(() => { setLoading(false) })
      // })
      // .catch((error)=>{
      //   console.log(`error occured in app.jsx create session: ${error}`);
      // })
      // .finally(()=>{setLoading(false)});
  }, [])


  return (loading) ? <h1>loading...</h1> : (
    <Provider store={store}>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block ">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </Provider>
  )
};

export default App;
