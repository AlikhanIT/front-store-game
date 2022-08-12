import './App.css';
import Header from "./components/Header";
import {
    Routes,
    Route,
} from "react-router-dom";
import * as React from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import FullPost from "./pages/FullPost";
import {Container} from "@mui/material";
import {AddPost} from "./pages/AddPost";
import {useDispatch} from 'react-redux';
import {useEffect} from "react";
import {fetchCheckAuth} from "./redux/slices/userSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if(window.localStorage.getItem("token")) {
            dispatch(fetchCheckAuth());
        }
    }, [])

  return (
      <>
          <Header />
          <Container>
             <Routes>
                 <Route path='/' element={<Home />} />
                 <Route path='/post/:id' element={<FullPost />} />
                 <Route path='/addPost' element={<AddPost />} />
                 <Route path='/post/:id/edit' element={<AddPost />} />
                 <Route path='*' element={<NotFound />} />
             </Routes>
          </Container>
      </>
  );
}

export default App;
