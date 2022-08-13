import React, {useCallback, useEffect, useRef} from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import {Link, useParams} from "react-router-dom";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchCreatePost, fetchEditPost, fetchOnePost, setDefault} from "../redux/slices/postSlice";
import axios, {BACK_URL} from "../redux/http/index";
import {Formik} from "formik";
import * as yup from "yup";
import {DialogActions, DialogContentText} from "@mui/material";

export const AddPost = () => {
    const inputFileRef = useRef(null);
    const {isAuth} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const {id} = useParams();

    const [text, setText] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");

    const validationSchema = yup.object().shape({
        title: yup.string().typeError("Должно быть строкой").required('Обязательно'),
        price: yup.number().typeError("Должно быть числом").required('Обязательно'),
    })

    if (!isAuth) {
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
                    setPrice(res.data.price);
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
            const { data } = await axios.post("/upload", form, {
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

    const onSubmit = async (priceForm, titleForm) => {
        if (id) {
            dispatch(fetchEditPost({
                id,
                text,
                title: titleForm,
                price: Number(priceForm),
                imageUrl,
            }));
        } else {
            dispatch(fetchCreatePost({
                text,
                title: titleForm,
                price: Number(priceForm),
                imageUrl,
            }));
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
        <Formik initialValues={{
            title: title,
            price: price,
        }}
                validateOnBlur
                onSubmit={values => onSubmit(values.price, values.title)}
                validationSchema={validationSchema}
        >
            {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                <Paper sx={{ p: "30px", mt: 4, mb: 4 }}>
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
                    <br />
                    <br />
                    <TextField
                        classes={{ root: styles.title }}
                        variant="standard"
                        value={title}
                        name={"title"}
                        onChange={(event) => {setTitle(event.target.value); return handleChange(event)}}
                        onBlur={handleBlur}
                        placeholder="Название товара..."
                        fullWidth
                    />
                    {touched.title && errors.title && <DialogContentText color={"red"}>
                        {errors.title}
                    </DialogContentText>
                    }
                    <SimpleMDE
                        className={styles.editor}
                        value={text}
                        onChange={onChange}
                        options={options}
                    />
                    <TextField
                        classes={{ root: styles.price }}
                        variant="standard"
                        value={price}
                        name={"price"}
                        onChange={(event) => {setPrice(event.target.value); return handleChange(event)}}
                        onBlur={handleBlur}
                        placeholder="Цена товара..."
                        fullWidth
                    />
                    {touched.price && errors.price && <DialogContentText color={"red"}>
                        {errors.price}
                    </DialogContentText>
                    }
                    <div className={styles.buttons}>
                        <Link style={{ textDecoration: 'none' }} to="/">
                            <Button disabled={!isValid && !dirty && !imageUrl && !text} onClick={handleSubmit} size="large" variant="contained">
                                {id ? "Сохранить" : "Опубликовать"}
                            </Button>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/">
                            <Button size="large">Отмена</Button>
                        </Link>
                    </div>
                </Paper>
            )}
        </Formik>
    );
};