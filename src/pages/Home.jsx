import Grid from "@mui/material/Grid";
import SearchInput from "../components/Search";
import Pagination from "../components/Pagination";
import * as React from "react";
import Sort from "../components/Sort";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import CardItem from "../components/CardItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPosts} from "../redux/slices/postSlice";

const Home = () => {
    const {isLoading, posts} = useSelector(state => {return state.postReducer.post});
    const {asc, page, sort} = useSelector(state => {return state.postReducer});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts({asc, page, sort}));
    }, [asc, page, sort])

    return (
         <Grid container justify = "center">
             <SearchInput />
             <Sort />
             <Container>
                 <Box sx={{ flexGrow: 1 }}>
                     <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                         {
                             isLoading
                                 ? [...new Array(9)].map((_, _id) => (
                                     <Grid item xs={12} sm={6} md={4} key={_id}>
                                         <CardItem isLoading/>
                                     </Grid>
                                 ))
                                 : posts.map((obj, id) => (
                                     <Grid item xs={12} sm={6} md={4} key={id}>
                                         <CardItem {...obj}/>
                                     </Grid>
                                 ))
                         }
                     </Grid>
                 </Box>
             </Container>
             <Pagination />
         </Grid>
    );
}

export default Home;