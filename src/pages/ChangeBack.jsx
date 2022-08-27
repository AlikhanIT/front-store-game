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
import {Alert} from "@mui/material";
import {fetchCreateCss} from "../redux/slices/cssSlice";

export const ChangeBack = () => {
    const inputFileRef = useRef(null);
    const {isAdmin} = useSelector((state) => state.userReducer);
    const img = useSelector((state) => state.cssReducer.imageUrl);
    const dispatch = useDispatch();

    const [imageUrl, setImageUrl] = React.useState("");

    if (!isAdmin) {
        window.location.pathname = "/";
    }

    useEffect(() => {
        setImageUrl(img);
    }, []);

    const handleChangeFile = async (event) => {
        try {
            const form = new FormData();
            const file = event.target.files[0];
            form.append("image", file);
            const {data} = await axios.post("/upload", form, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "multipart/form-data",
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
        dispatch(
            fetchCreateCss({
                imageUrl,
            })
        );
        window.location.pathname = "/";
        dispatch(setDefault());
    };

    return (
        <Paper sx={{p: "30px", mt: 4, mb: 4}}>
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
            {imageUrl && (
                <>
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
                        // src={`${API_URL}${imageUrl}`}
                        // src={`https://source.unsplash.com/random`}
                        alt="Uploaded"
                    />
                </>
            )}
            <br/>
            <div className={styles.buttons}>
                <Link style={{textDecoration: "none"}} to="/">
                    <Button
                        disabled={!imageUrl}
                        onClick={() => (onSubmit())}
                        size="large"
                        variant="contained"
                    >
                        Сохранить
                    </Button>
                </Link>
                <Link style={{textDecoration: "none"}} to="/">
                    <Button size="large">Отмена</Button>
                </Link>
            </div>
            {!imageUrl ?
                <Alert sx={{mt: 2}} severity={"info"} variant={"filled"}>Изображение обязательно</Alert> : ""}
        </Paper>
    );
};
