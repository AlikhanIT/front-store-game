import React, {useEffect, useRef} from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    setDefault,
} from "../redux/slices/postSlice";
import axios, {BACK_URL} from "../redux/http/index";
import {Alert, Container, IconButton, Skeleton} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardItem from "../components/CardItem";
import {Clear} from "@mui/icons-material";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import {fetchCreateSlider, fetchDeleteSlider, fetchSlider} from "../redux/slices/sliderSlice";

export const ChangeNews = () => {
    const inputFileRef = useRef(null);
    const {isAdmin} = useSelector((state) => state.userReducer);
    const {isLoading, data} = useSelector((state) => state.sliderReducer);
    const dispatch = useDispatch();

    const [imageUrl, setImageUrl] = React.useState("");

    if (!isAdmin) {
        window.location.pathname = "/";
    }

    useEffect(() => {
        dispatch(fetchSlider());
    }, []);

    const handleChangeFile = async (event) => {
        try {
            const form = new FormData();
            const file = event.target.files[0];
            form.append("image", file);
            const {data} = await axios.post("/upload", form, {
                headers: {
                    "Access-Control-Allow-Origin": "*", "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(data.url);
        } catch (err) {
            console.warn(err);
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl("");
    };

    const onSubmit = async () => {
        dispatch(fetchCreateSlider({
            imageUrl,
        }));
        window.location.pathname = "/";
        dispatch(setDefault());
    };

    return (<Paper sx={{p: "30px", mt: 4, mb: 4}}>
            <Button
                onClick={() => inputFileRef.current.click()}
                variant="outlined"
                size="large"
                sx={{mb: 3}}
            >
                Загрузить превью
            </Button>
            <input
                ref={inputFileRef}
                type="file"
                onChange={handleChangeFile}
                hidden
            />
            {imageUrl && (<>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onClickRemoveImage}
                    >
                        Удалить
                    </Button>
                    <img
                        className={styles.image}
                        src={`${BACK_URL}${imageUrl}`}
                        alt="Uploaded"
                    />
                </>)}
            <br/>
            <div className={styles.buttons}>
                <Link style={{textDecoration: "none"}} to="/">
                    <Button
                        disabled={!imageUrl}
                        onClick={() => (onSubmit())}
                        size="large"
                        variant="contained"
                    >
                        Опубликовать
                    </Button>
                </Link>
                <Link style={{textDecoration: "none"}} to="/">
                    <Button size="large">Отмена</Button>
                </Link>
            </div>
            {!imageUrl ? <Alert sx={{mt: 2}} severity={"info"} variant={"filled"}>Изображение обязательно</Alert> : ""}
            <Grid container justify="center">

                <Container>
                    <Box sx={{flexGrow: 1}}>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {isLoading ? [...new Array(9)].map((_, _id) => (<Grid item xs={12} sm={6} md={4} key={_id}>
                                    <CardItem isLoading/>
                                </Grid>)) : data.map((obj, id) => (<Grid item xs={12} sm={6} md={4} key={id}>
                                    <Card className={styles.root} sx={{maxWidth: 345, mt: 1}}>
                                        <div className={styles.editButtons}>
                                            <IconButton
                                                onClick={() => {
                                                    dispatch(fetchDeleteSlider(obj._id));
                                                }}
                                                color="secondary"
                                            >
                                                <Clear/>
                                            </IconButton>
                                        </div>
                                        {isLoading ? (<Skeleton variant="rectangular" animation="wave" height={190}/>) :
                                            <Link to={`/post/${obj._id}`}>
                                                <CardMedia
                                                    sx={{backgroundColor: "black"}}
                                                    component="img"
                                                    height="190"
                                                    image={`${obj.image}`}
                                                    alt="green iguana"
                                                />
                                            </Link>}
                                    </Card>
                                </Grid>))}
                        </Grid>
                    </Box>
                </Container>
            </Grid>
        </Paper>);
};
