import React from "react";

//components
import Input from "../components/form/Input";
import Button from "../components/form/Button";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../utils/providers/auth.provider";

import schema from "../utils/schemas/signin.schema";
import useAxiosInstance from "../utils/hooks/useAxiosInstance";

const Signin = (props) => {
  const instance = useAxiosInstance();

  const {
    setUser
  } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const doSignin = data => {
    const newUser = {
      ...data,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

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

        <Button type="submit" title="Access Account" />

        <Link to="/signup" className="u-link u-text-center mt-20">Signup now here!</Link>
      </form>
    </div>
  );
}

export default Signin;