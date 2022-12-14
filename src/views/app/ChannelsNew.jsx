import React from "react";

import { ArrowLeft } from "react-feather";

//components
import RoundedButton from "../../components/form/RoundedButton";

//components
import Input from "../../components/form/Input";
import Textarea from "../../components/form/Textarea";
import Button from "../../components/form/Button";

//dependencies
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../utils/hooks/useHttp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../utils/providers/auth.provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../utils/hooks/useToast";

//configs
import schema from "../../utils/schemas/channel.schema";

const ChannelsNew = () => {
  const { fire, ToastContainer } = useToast();
  const { user } = useAuth();
  const request = useHttp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const createNewChannel = data => request({ url: "/channels", method: "POST", data });

  const { mutate, isLoading } = useMutation(createNewChannel, {
    onSuccess: response => {
      const channel = response.data.channel;
      queryClient.invalidateQueries(["channels"]);
      navigate("/channels/" + channel.id, {
        state: {
          channel: {
            id: channel.id,
            name: channel.name,
            description: channel.description,
            chat: {
              id: channel.chat_id
            }
          }
        }});
    },
    onError: error => {
      if (error.response) {
        fire("😭", error.response.data.message);
      } else {
        fire("😭", "Ocorreu um erro inesperado. Por favor, tente novamente!");
      }
    },
    onSettled: () => { }
  });

  const submitChannel = formData => mutate({
    name: formData.channel_name,
    description: formData.description,
    user_id: user.id
  });

  const goBack = () => {
    navigate("/channels");
  }

  return (
    <div>
      <ToastContainer/>
      
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

            <Textarea label="Description" rows={5} placeholder="Esse canal irá tratar de..."
              name="description" register={register} error={errors.description} />

            <Button type="submit" title="Create a new channel"
              loading={isLoading} disabled={isLoading} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChannelsNew;