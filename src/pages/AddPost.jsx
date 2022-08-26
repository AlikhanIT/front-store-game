import React, {useEffect, useRef} from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import {Link, useParams} from "react-router-dom";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCreatePost,
    fetchEditPost,
    setDefault,
} from "../redux/slices/postSlice";
import axios, {BACK_URL} from "../redux/http/index";
import {Alert} from "@mui/material";

export const AddPost = () => {
    const inputFileRef = useRef(null);
    const {isAdmin} = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const {id} = useParams();

    const [text, setText] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [price1, setPrice1] = React.useState("");
    const [price2, setPrice2] = React.useState("");
    const [price3, setPrice3] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");

    if (!isAdmin) {
        window.location.pathname = "/";
    }

    useEffect(() => {
        if (id) {
            axios
                .get(`/post/${id}`)
                .then((res) => {
                    setText(res.data.text);
                    setImageUrl(res.data.imageUrl ? res.data.imageUrl : "");
                    setTitle(res.data.title);
                    setPrice1(res.data.price1);
                    setPrice2(res.data.price2);
                    setPrice3(res.data.price3);
                })
                .catch((err) => {
                    console.warn(err);
                    alert("Ошибка при получении статьи");
                });
        }
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
        if (id) {
            dispatch(
                fetchEditPost({
                    id,
                    text,
                    title,
                    price1,
                    price2,
                    price3,
                    imageUrl,
                })
            );
        } else {
            dispatch(
                fetchCreatePost({
                    text,
                    title,
                    price1,
                    price2,
                    price3,
                    imageUrl,
                })
            );
        }
        window.location.pathname = "/";
        dispatch(setDefault());
    };

    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: "200px",
            autofocus: true,
            placeholder: "Введите описание товара...",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        []
    );

    return (
        <Paper sx={{p: "30px", mt: 4, mb: 4}}>
            <Button
                onClick={() => inputFileRef.current.click()}
                variant="outlined"
                size="large"
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
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                value={title}
                name={"title"}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Название товара..."
                fullWidth
            />
            <SimpleMDE
                className={styles.editor}
                value={text}
                onChange={onChange}
                options={options}
            />
            <TextField
                classes={{root: styles.price}}
                variant="standard"
                value={price1}
                name={"price"}
                onChange={(event) => (
                    setPrice1(event.target.value))}
                placeholder="Универсальная цена товара..."
                fullWidth
            />
            <TextField
                classes={{root: styles.price}}
                variant="standard"
                value={price2}
                name={"price"}
                onChange={(event) => (
                    setPrice2(event.target.value))}
                placeholder="Цена товара с интернетом..."
                fullWidth
            />
            <TextField
                classes={{root: styles.price}}
                variant="standard"
                value={price3}
                name={"price"}
                onChange={(event) => (
                    setPrice3(event.target.value))}
                placeholder="Цена товара без интернета..."
                fullWidth
            />
            <div className={styles.buttons}>
                <Link style={{textDecoration: "none"}} to="/">
                    <Button
                        disabled={!title || !text || !imageUrl || !price1 || !price2 || !price3}
                        onClick={() => (onSubmit())}
                        size="large"
                        variant="contained"
                    >
                        {id ? "Сохранить" : "Опубликовать"}
                    </Button>
                </Link>
                <Link style={{textDecoration: "none"}} to="/">
                    <Button size="large">Отмена</Button>
                </Link>
            </div>
            {!title || !text || !imageUrl || !price1 || !price2 || !price3 ?
                <Alert sx={{mt: 2}} severity={"info"} variant={"filled"}>Все поля включая изображение обязательны</Alert> : ""}
        </Paper>
    );
};
