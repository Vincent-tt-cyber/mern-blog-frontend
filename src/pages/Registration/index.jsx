import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert("Не удалось совершить регистрацию :(");
    }
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите полное имя" })}
          error={Boolean(errors.fullName?.message)}
          className={styles.field}
          label="Полное имя (Вася Пупкин)"
          fullWidth
        />
        <TextField
          type="email"
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          error={Boolean(errors.email?.message)}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          type="password"
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          error={Boolean(errors.password?.message)}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
