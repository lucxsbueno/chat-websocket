import React from "react";

import jwt_decode from "jwt-decode";

//components
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";

//dependencies
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../utils/providers/auth.provider";
import { useHttp } from "../../utils/hooks/useHttp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../utils/hooks/useToast";

//configs
import schema from "../../utils/schemas/signin.schema";

const Signin = () => {
  const { fire, ToastContainer } = useToast();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const request = useHttp();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const signin = data => request({ url: "/users/signin", method: "POST", data });

  const { mutate, isLoading } = useMutation(signin, {
    onSuccess: response => {
      var decoded = jwt_decode(response.data.token);

      const newUser = {
        ...decoded.user,
        token: response.data.token
      };

      setUser(newUser);
      localStorage.setItem("ws-chat-user", JSON.stringify(newUser));
      navigate("/channels");
    },
    onError: error => {
      if (error.response) {
        fire("😭", error.response.data.message);
      } else {
        fire("😭", error.response.data.message);
      }
    },
    onSettled: () => { }
  });

  const doSignin = formData => mutate(formData);

  return (
    <div className="card">
      <ToastContainer />

      <h1 className="h1">Welcome back 👋🏻</h1>
      <p className="p-01">
        Not a member? <Link to="/signup" className="link">signup now here!</Link>.
      </p>

      <form className="mt-10" onSubmit={handleSubmit(doSignin)}>
        <Input label="Endereço de e-mail" type="text" placeholder="john@doe"
          name="email" register={register} error={errors.email} />

        <Input label="Senha de acesso" type="password" placeholder="exemplo123"
          name="pass" register={register} error={errors.pass} />

        <Button type="submit" title="Access Account"
          loading={isLoading} disabled={isLoading} />

        <Link to="/signup" className="link text-center mt-20">Signup now here!</Link>
      </form>
    </div>
  );
}

export default Signin;