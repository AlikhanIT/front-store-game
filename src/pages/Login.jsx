import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Alert,
  Avatar,
  Button,
  DialogActions,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchLogin, fetchRegister } from "../redux/slices/userSlice";
import { Formik } from "formik";
import * as yup from "yup";
import {useState} from "react";
import {useRef} from "react";
import axios, {BACK_URL} from "../redux/http";

export default function Login({ open, handleClose, register }) {
  const validationRegSchema = yup.object().shape({
    email: yup.string().email("Введите верный email").required("Обязательно"),
    names: yup
        .string()
        .typeError("Должно быть строкой")
        .required("Обязательно")
        .min(2, "Минимальная длинна 2 символa"),
    password: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно")
      .min(6, "Минимальная длинна 6 символов"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Обязательно")
      .min(6, "Минимальная длинна 6 символов"),
  });

  const validationLogSchema = yup.object().shape({
    email: yup.string().email("Введите верный email").required("Обязательно"),
    password: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно")
      .min(6, "Минимальная длинна 6 символов"),
  });

  const dispatch = useDispatch();

  const handleCloseFunc = () => {
    handleClose();
  };

  const auth = (email, password, name = "") => {
    if (register) {
      dispatch(fetchRegister({ email, password, imageUrl, name }));
    } else {
      dispatch(fetchLogin({ email, password }));
    }
    handleClose();
  };

  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef(null);

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const handleChangeFile = async (event) => {
    try {
      const form = new FormData();
      const file = event.target.files[0];
      form.append("image", file);
      const {data} = await axios.post("/uploads", form, {
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

  return (
    <Formik
      initialValues={{
        email: "",
        names: "",
        password: "",
        confirmPassword: "",
      }}
      validateOnBlur
      onSubmit={(values) => auth(values.email, values.password, values.names)}
      validationSchema={register ? validationRegSchema : validationLogSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
      }) => (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {register ? (
            <DialogTitle id="form-dialog-title">Зарегестрироваться</DialogTitle>
          ) : (
            <DialogTitle id="form-dialog-title">Войти</DialogTitle>
          )}
          <DialogContent>
            {register ? (
              <DialogContentText>Регистрация</DialogContentText>
            ) : (
              <DialogContentText>Авторизация</DialogContentText>
            )}
            {register ? (
                <div style={{display: "flex", flexDirection: "column"}}>
                  <Button
                      onClick={() => inputFileRef.current.click()}
                  >
                    <Avatar sx={{ width: 86, height: 86, m: "0px auto", mb: 2, mt: 2}} src={`${BACK_URL}${imageUrl}`}/>
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
                      </>
                  )}
                  {
                    !imageUrl ?
                        <Alert sx={{mt: 2}} severity={"info"} variant={"filled"}>Изображение обязательно обязательно</Alert> : ""
                  }
                </div>
            ) : (
                ""
            )}
            <TextField
              autoFocus
              margin="dense"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
            />
            {touched.email && errors.email && (
              <DialogContentText width={"500px"} color={"red"}>
                {errors.email}
              </DialogContentText>
            )}
            {register ? (
                <>
                  <TextField
                      margin="dense"
                      id="names"
                      label="Ваш ник"
                      name="names"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="names"
                      fullWidth
                  />
                  {touched.names && errors.names && (
                      <DialogContentText color={"red"}>
                        {errors.names}
                      </DialogContentText>
                  )}
                </>
            ) : (
                ""
            )}
            <TextField
              margin="dense"
              id="pass"
              label="Пароль"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type="password"
              fullWidth
            />
            {touched.password && errors.password && (
              <DialogContentText color={"red"}>
                {errors.password}
              </DialogContentText>
            )}
            {register ? (
              <>
                <TextField
                  margin="dense"
                  id="pass2"
                  label="Повторите пароль"
                  name="confirmPassword"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  fullWidth
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <DialogContentText color={"red"}>
                    {errors.confirmPassword}
                  </DialogContentText>
                )}
              </>
            ) : (
              ""
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFunc} color="primary">
              Отмена
            </Button>
            {register ? (
              <Button
                disabled={!isValid && !dirty && !imageUrl}
                onClick={handleSubmit}
                type="submit"
                color="primary"
              >
                Зарегистрироваться
              </Button>
            ) : (
              <Button
                disabled={!isValid && !dirty}
                onClick={handleSubmit}
                type="submit"
                color="primary"
              >
                Войти
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
}
