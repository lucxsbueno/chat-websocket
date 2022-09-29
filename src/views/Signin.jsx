import React from "react";

//components
import Input from "../components/form/Input";
import Button from "../components/form/Button";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "react-simple-snackbar";
import { useAuth } from "../utils/providers/auth.provider";
import { useHttp } from "../utils/hooks/useHttp";

import schema from "../utils/schemas/signin.schema";
import options from "../utils/config/snackbar.config";

const Signin = () => {
  //hooks
  const [openSnackbarError] = useSnackbar(options("error"));
  const { setUser } = useAuth();
  const fetch = useHttp();

  //useForm
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const signin = data => fetch({ url: "/users/signin", method: "POST", data });

  const { mutate, isLoading } = useMutation(signin, {
    onSuccess: response => {
      const newUser = response.data;

      setUser(newUser);
      localStorage.setItem("ws-chat-user", JSON.stringify(newUser));
    },
    onError: error => {
      if (error.response) {
        openSnackbarError(error.response.data.message);
      } else {
        openSnackbarError("Erro interno do servidor.");
      }
    },
    onSettled: () => {}
  });

  const doSignin = formData => mutate(formData);

  return (
    <div className="card">
      <h1 className="u-h1">Welcome back 👋🏻</h1>
      <p className="u-p-01">
        Not a member? <Link to="/signup" className="u-link">signup now here!</Link>.
      </p>

      <form className="mt-10" onSubmit={handleSubmit(doSignin)}>
        <Input label="Endereço de e-mail" type="text" placeholder="john@doe"
          name="email" register={register} error={errors.email} />

        <Input label="Senha de acesso" type="text" placeholder="exemplo123"
          name="pass" register={register} error={errors.pass} />

        <Button type="submit" title="Access Account"
         loading={isLoading} disabled={isLoading} />

        <Link to="/signup" className="u-link u-text-center mt-20">Signup now here!</Link>
      </form>
    </div>
  );
}

export default Signin;