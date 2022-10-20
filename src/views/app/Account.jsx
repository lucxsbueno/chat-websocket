import React from "react";

import cuid from "cuid";

//components
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "react-simple-snackbar";
import { useHttp } from "../../utils/hooks/useHttp";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../utils/providers/auth.provider";

import schema from "../../utils/schemas/account.schema";
import options from "../../utils/config/snackbar.config";

const Account = () => {
  const { user } = useAuth();
  const [openSnackbarSuccess] = useSnackbar(options("success"));
  const [openSnackbarError] = useSnackbar(options("error"));
  const navigate = useNavigate();
  const request = useHttp();

  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email
    }
  });

  const signup = data => request({ url: "/users/signup", method: "POST", data });

  const { mutate, isLoading } = useMutation(signup, {
    onSuccess: response => {
      if (response.data) {
        openSnackbarSuccess(response.data.message);
        navigate("/");
      }
    },
    onError: error => {
      if (error.response) {
        openSnackbarError(error.response.data.message);
      } else {
        openSnackbarError("Erro interno do servidor!");
      }
    },
    onSettled: () => { }
  });

  const doSignup = formData => mutate({
    ...formData,
    avatar: "https://avatars.dicebear.com/api/identicon/" + formData.email + ".svg",
    username: "guest-" + cuid()
  });

  return (
    <div className="account container-fluid">
      <div className="app__header app__header--bg-03">
        <h2 className="p-sm fw-5">Minha conta</h2>
      </div>

      <div className="container-fluid d-flex flex-column align-center justify-center">
        <div className="account__header d-flex flex-column align-center mt-100">
          <img alt="My user avatar" src={user.avatar} className="account__avatar" />

          <p className="account__greetings">Olá, <span className="account__name">{user.name}</span>! 👋🏻</p>
        </div>

        <div className="card mt-20">
          <form onSubmit={handleSubmit(doSignup)}>
            <Input label="Nome completo" type="text" placeholder="John Doe"
              name="name" register={register} error={errors.name} />

            <Input label="Nome de usuário" type="text" placeholder="@johndoe"
              name="username" register={register} error={errors.username} />

            <Input label="Endereço de e-mail" type="text" placeholder="john@doe"
              name="email" register={register} error={errors.email} />

            <Button type="submit" title="Update account" loading={isLoading} disabled={isLoading} />

            <Link to="/" className="link text-center mt-20">I forget my password</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;