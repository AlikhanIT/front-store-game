import Header from "./components/Header";
import {Routes, Route} from "react-router-dom";
import * as React from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import FullPost from "./pages/FullPost";
import {Container} from "@mui/material";
import {AddPost} from "./pages/AddPost";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCheckAuth} from "./redux/slices/userSlice";
import Help from "./pages/Help";
import {AddHelp} from "./pages/AddHelp";
import {CommentsBlock} from "./pages/CommentsBlock";
import {ChangeBack} from "./pages/ChangeBack";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {fetchCss} from "./redux/slices/cssSlice";
import {BACK_URL} from "./redux/http";
import {ChangeNews} from "./pages/ChangeNews";
import {ChangePhone} from "./pages/ChangePhone";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const dispatch = useDispatch();
    const {imageUrl} = useSelector(state => state.cssReducer);

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            dispatch(fetchCheckAuth());
        }
        dispatch(fetchCss());
    }, [])

    const style = {
        paperContainer: {
            backgroundImage: `url(${(BACK_URL + imageUrl) || process.env.REACT_APP_IMAGE_URL})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            minHeight: `${window.screen.height}px`,
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div style={style.paperContainer}>
                <Header/>
                <div>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/help" element={<Help/>}/>
                            <Route path="/post/:id" element={<FullPost/>}/>
                            <Route path="/addPost" element={<AddPost/>}/>
                            <Route path="/addHelp" element={<AddHelp/>}/>
                            <Route path="/post/:id/edit" element={<AddPost/>}/>
                            <Route path="/addHelp/:id/edit" element={<AddHelp/>}/>
                            <Route path="/comments" element={<CommentsBlock/>}/>
                            <Route path="/changeBack" element={<ChangeBack/>}/>
                            <Route path="/changeNews" element={<ChangeNews/>}/>
                            <Route path="/changePhone" element={<ChangePhone/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </Container>
                </div>
                <div style={{visibility: "hidden"}}>
                    footer
                </div>
            </div>
        </ThemeProvider>);
}

export default App;
