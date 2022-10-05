import React from "react";

import { ArrowLeft } from "react-feather";

//components
import RoundedButton from "../../components/form/RoundedButton";

//components
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";

//dependencies
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../utils/hooks/useHttp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "react-simple-snackbar";

//configs
import schema from "../../utils/schemas/channel.schema";
import options from "../../utils/config/snackbar.config";

const ChannelsNew = () => {
  const request = useHttp();
  const navigate = useNavigate();
  const [openSnackbarError] = useSnackbar(options("error"));
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const createNewChannel = data => request({ url: "/channels", method: "POST", data });

  const { mutate, isLoading } = useMutation(createNewChannel, {
    onSuccess: response => {
      console.log(response);
    },
    onError: error => {
      if (error.response) {
        openSnackbarError(error.response.data.message);
      } else {
        openSnackbarError("Erro interno do servidor.");
      }
    },
    onSettled: () => { }
  });

  const submitChannel = formData => mutate(formData);

  const goBack = () => {
    navigate("/channels");
  }

  return (
    <div>
      <div className="app__header app__header--bg-03">
        <div className="d-flex flex-row align-center">
          <RoundedButton onClick={goBack}>
            <ArrowLeft />
          </RoundedButton>

          <h2 className="ml-20 p-sm fw-5">New channel</h2>
        </div>
      </div>

      <div className="app__container x-p-20 y-p-20 d-flex flex-row justify-center">
        <div className="card pt-10 mt-100">
          <form onSubmit={handleSubmit(submitChannel)}>
            <Input label="Channel's name" type="text" placeholder="Memes"
              name="channel_name" register={register} error={errors.channel_name} />

            <Button type="submit" title="Create a new channel"
              loading={isLoading} disabled={isLoading} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChannelsNew;