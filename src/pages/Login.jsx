import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {Button, DialogActions, DialogContentText, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {fetchLogin, fetchRegister} from "../redux/slices/userSlice";
import {Formik} from "formik";
import * as yup from "yup";

export default function Login({open, handleClose, register}) {
    const validationRegSchema = yup.object().shape({
        email: yup.string().email('Введите верный email').required('Обязательно'),
        password: yup.string().typeError("Должно быть строкой").required('Обязательно').min(6, 'Минимальная длинна 6 символов'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательно').min(6, 'Минимальная длинна 6 символов'),
    });

    const validationLogSchema = yup.object().shape({
        email: yup.string().email('Введите верный email').required('Обязательно'),
        password: yup.string().typeError("Должно быть строкой").required('Обязательно').min(6, 'Минимальная длинна 6 символов'),
    });

    const dispatch = useDispatch();

    const handleCloseFunc = () => {
        handleClose();
    }

    const auth = (email, password) => {
      if (register) {
          dispatch(fetchRegister({email, password}));
      } else {
          dispatch(fetchLogin({email, password}));
      }
      handleClose();
    }

    return (
        <Formik initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
        }}
                validateOnBlur
                onSubmit={values => auth(values.email, values.password)}
                validationSchema={register ? validationRegSchema : validationLogSchema}
        >
            {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    {
                        register
                            ? <DialogTitle id="form-dialog-title">Зарегестрироваться</DialogTitle>
                            : <DialogTitle id="form-dialog-title">Войти</DialogTitle>
                    }
                    <DialogContent>
                        {
                            register
                                ? <DialogContentText>Регистрация</DialogContentText>
                                : <DialogContentText>Авторизация</DialogContentText>
                        }
                        <TextField
                            autoFocus
                            margin="dense"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="email"
                            name='email'
                            label="Email"
                            type="email"
                            fullWidth
                        />
                        {touched.email && errors.email && <DialogContentText width={"500px"} color={"red"}>
                            {errors.email}
                        </DialogContentText>
                        }
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
                        {touched.password && errors.password && <DialogContentText color={"red"}>
                            {errors.password}
                        </DialogContentText>
                        }
                        {
                            register
                                ?
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
                                    {touched.confirmPassword && errors.confirmPassword && <DialogContentText color={"red"}>
                                        {errors.confirmPassword}
                                    </DialogContentText>
                                    }
                                </>
                                : ''
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseFunc} color="primary">Отмена</Button>
                        {
                            register
                                ? <Button disabled={!isValid && !dirty} onClick={handleSubmit} type="submit" color="primary">Зарегестрироваться</Button>
                                : <Button disabled={!isValid && !dirty} onClick={handleSubmit} type="submit" color="primary">Войти</Button>
                        }
                    </DialogActions>
                </Dialog>
            )}
        </Formik>
    );
}
