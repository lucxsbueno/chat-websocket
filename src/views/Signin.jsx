import React from "react";

//components
import Input from "../components/form/Input";
import Button from "../components/form/Button";

import {
  Link
} from "react-router-dom";

import {
  useForm
} from "react-hook-form";

import {
  yupResolver
} from "@hookform/resolvers/yup";

import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Preencha um e-mail válido.").required("O campo e-mail precisa ser preenchido."),
  password: yup.string().min(4, "Minímo 4 caracteres.").max(16, "Máximo 16 caracteres.").required("A senha é necessária.")
}).required();

const Signin = (props) => {
  const { register, handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const doSignin = (data) => {
    console.log(data);
  }

  return (
    <div className="signin">
      <div className="card">
        <h1 className="u-h1">Welcome back 👋🏻</h1>
        <p className="u-p-01">
          Not a member? <Link to="/signup" className="u-link">signup now here!</Link>.
        </p>

        <form className="mt-10" onSubmit={handleSubmit(doSignin)}>
          <Input label="Endereço de e-mail" type="text" placeholder="john@doe"
            name="email" register={register} error={errors.email} />

          <Input label="Senha de acesso" type="text" placeholder="exemplo123"
            name="password" register={register} error={errors.password} />

          <Button type="submit" title="Access Account" />

          <Link to="/signup" className="u-link u-text-center mt-20">Signup now here!</Link>
        </form>
      </div>
    </div>
  );
}

export default Signin;