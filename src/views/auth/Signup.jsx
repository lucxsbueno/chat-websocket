import React from "react";

import cuid from "cuid";

//components
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useHttp } from "../../utils/hooks/useHttp";

import schema from "../../utils/schemas/signup.schema";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });;
  const navigate = useNavigate();
  const request = useHttp();

  const signup = data => request({ url: "/users/signup", method: "POST", data });

  const { mutate, isLoading } = useMutation(signup, {
    onSuccess: response => {
      if (response.data) {
        //rip snackbar
        navigate("/");
      }
    },
    onError: error => {
      if (error.response) {
        //rip snackbar
      } else {
        //rip snackbar
      }
    },
    onSettled: () => {}
  });

  const doSignup = formData => mutate({
    ...formData,
    avatar: "https://avatars.dicebear.com/api/identicon/" + formData.email + ".svg",
    username: "guest-" + cuid()
  });

  return (
    <div className="card">
      <h1 className="h1">Signup</h1>
      <p className="p-01">
        If you are a member, <Link to="/" className="link">signin here</Link>.
      </p>

      <form className="mt-10" onSubmit={handleSubmit(doSignup)}>
        <Input label="Nome completo" type="text" placeholder="John Doe"
          name="name" register={register} error={errors.name} />

        <Input label="Endereço de e-mail" type="text" placeholder="john@doe"
          name="email" register={register} error={errors.email} />

        <Input label="Senha de acesso" type="password" placeholder="exemplo123"
          name="pass" register={register} error={errors.pass} />

        <Button type="submit" title="Create Account" loading={isLoading} disabled={isLoading} />

        <Link to="/" className="link text-center mt-20">← Come back</Link>
      </form>
    </div>
  );
}

export default Signup;