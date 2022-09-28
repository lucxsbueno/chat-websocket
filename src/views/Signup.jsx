import React from "react";

//components
import Input from "../components/form/Input";
import Button from "../components/form/Button";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "react-simple-snackbar";

import schema from "../utils/schemas/signup.schema";

const Signup = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [openSnackbar, closeSnackbar] = useSnackbar();

  const signup = data => fetch({ url: "/users/signup", method: "POST", data });

  const { mutate, isLoading } = useMutation(signup, {
    onSuccess: response => {
      openSnackbar(response.data.message);
    },
    onError: error => {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Erro interno do servidor.");
      }
    },
    onSettled: () => {}
  });

  const doSignup = formData => mutate(formData);

  return (
    <div className="card">
      <h1 className="u-h1">Signup</h1>
      <p className="u-p-01">
        If you are a member, <Link to="/" className="u-link">signin here</Link>.
      </p>

      <form className="mt-10" onSubmit={handleSubmit(doSignup)}>
        <Input label="Nome completo" type="text" placeholder="John Doe"
          name="name" register={register} error={errors.name} />

        <Input label="Endereço de e-mail" type="text" placeholder="john@doe"
          name="email" register={register} error={errors.email} />

        <Input label="Senha de acesso" type="text" placeholder="exemplo123"
          name="pass" register={register} error={errors.pass} />

        <Button type="submit" title="Create Account" loading={isLoading} disabled={isLoading} />

        <Link to="/" className="u-link u-text-center mt-20">← Come back</Link>
      </form>
    </div>
  );
}

export default Signup;