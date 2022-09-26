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

import schema from "../utils/schemas/signup.schema";

const Signup = (props) => {
  const { register, handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const doSignup = (data) => console.log(data);

  return (
    <div className="signin">
      <div className="card">
        <h1 className="u-h1">Signup</h1>
        <p className="u-p-01">
          If you are a member, <Link to="/" className="u-link">signin here</Link>.
        </p>

        <form className="mt-10" onSubmit={handleSubmit(doSignup)}>
          <Input label="Nome completo" type="text" placeholder="John Doe"
            name="full_name" register={register} error={errors.full_name} />

          <Input label="Endereço de e-mail" type="text" placeholder="john@doe"
            name="email" register={register} error={errors.email} />

          <Input label="Senha de acesso" type="text" placeholder="exemplo123"
            name="password" register={register} error={errors.password} />

          <Button type="submit" title="Create Account" />

          <Link to="/" className="u-link u-text-center mt-20">← Come back</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;