import React from "react";

import {
  useParams,
  useLocation
} from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../utils/hooks/useHttp";
import { Send } from "react-feather";

//components
import RoundedButton from "../../components/form/RoundedButton";
import TextareaControled from "../../components/form/TextareaControled";

const Channels = () => {
  const [message, updateMessage] = React.useState("");

  const request = useHttp();
  const params = useParams();
  const location = useLocation();

  const { data, isLoading } = useQuery(["chat", params.id], () => request({ url: "/channels/" + params.id, method: "GET" }));

  return (
    <div className="chat">
      <div className="app__header app__header--bg-03 chat__header">
        <div className="d-flex flex-row align-center justify-center">
          <div className="avatar avatar--sm mr-20">
            <img className="avatar__img" alt="Profile user information" src="https://cdn.dribbble.com/users/230875/screenshots/12078079/media/c08285d2e039896a565cffeb5eb44a15.jpg?compress=1&resize=400x300&vertical=top" />
          </div>
          <h2 className="p-sm fw-4">{location.state.channel.name}</h2>
        </div>
        <div className="x-p-20 y-p-20">
        </div>
      </div>

      <div className="chat__body text-color x-p-20 y-p-20">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque congue quis eros sed semper. Donec sit amet varius nulla. Aliquam in ex auctor risus faucibus lobortis eget at felis. Nulla varius nibh vitae arcu scelerisque, sit amet mattis justo congue. Nam lacus augue, posuere nec mauris ut, faucibus ornare est. Nunc suscipit facilisis quam id dignissim. Integer lobortis lectus nec orci posuere, sit amet pharetra tortor rhoncus. Aliquam placerat ultrices urna, sed pretium mauris gravida vel. Pellentesque vestibulum magna sit amet rutrum molestie. Nulla fermentum mauris id velit dapibus rutrum.

Maecenas et erat consequat, fermentum neque eget, consectetur purus. Maecenas cursus sapien eu porttitor congue. Integer ut leo odio. Duis tortor libero, semper vitae diam ac, molestie tristique nisi. Morbi eu felis ac odio cursus tincidunt. Donec eget massa interdum, lacinia ligula eget, convallis magna. Quisque ut risus nec est convallis consectetur. Vivamus sed rutrum arcu. Praesent non consequat magna. Proin lacinia maximus ante, non convallis tortor volutpat ac. Pellentesque consectetur leo vitae eros dignissim, egestas ultricies augue posuere. Curabitur porta, quam ac malesuada tempor, enim odio pulvinar leo, vel accumsan massa turpis vel lectus. Sed efficitur non velit eu cursus. Nulla venenatis lorem lacus, vitae tristique magna dignissim nec. Quisque ipsum elit, euismod finibus magna in, pretium interdum tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

Morbi eget felis nisi. Nunc non lorem leo. Praesent fermentum sem eu aliquam tempor. Maecenas laoreet leo id risus vehicula fermentum. Donec lobortis eget arcu id bibendum. Duis eget purus dolor. Sed ipsum mi, consectetur et justo a, mattis lacinia neque. Aliquam ullamcorper vitae lorem quis ullamcorper. Cras in leo lectus. Donec euismod hendrerit mi a facilisis. Phasellus non orci sed metus sodales ornare. Suspendisse eget diam vel dui dignissim molestie.

Proin condimentum ut mi id varius. Nulla vel euismod augue. Duis vel purus in ligula porta bibendum. Nam euismod a nulla eget congue. Pellentesque in semper turpis. Mauris eu massa sit amet erat pharetra molestie a et elit. Etiam sagittis eu sem ut ullamcorper. Maecenas ornare laoreet tincidunt. Vivamus ac augue auctor, rhoncus massa a, pulvinar nunc. Sed at urna elit. Cras eu tellus porta lectus facilisis tempor. Cras non imperdiet dui. Nulla ornare enim vel finibus malesuada.

Fusce tristique eros eu orci eleifend vestibulum. Aliquam justo lacus, tincidunt quis elit quis, fringilla dapibus nisi. Cras ut vulputate tellus, sit amet efficitur velit. Duis massa lorem, auctor at lorem vitae, eleifend malesuada mauris. Nunc in maximus purus, non fringilla enim. Integer malesuada nisi ante, id congue erat bibendum ac. Praesent at nisi sit amet lorem rhoncus bibendum ut nec nisl. Vivamus porta est ut varius accumsan. Phasellus dictum elementum efficitur. Vivamus tincidunt arcu vitae magna condimentum, a bibendum lorem finibus. Quisque sed pellentesque nisl, vel laoreet nisi.

Vivamus sed urna metus. Vestibulum neque urna, pretium ut elit id, suscipit pretium orci. Vivamus felis magna, tristique et gravida porttitor, pharetra eget odio. Phasellus euismod ligula purus, et porta neque fringilla sed. Morbi non turpis magna. In consectetur neque a erat mattis, eu tempor velit lacinia. Cras quis sapien ipsum. Nam varius neque et tempor aliquam. Sed eget ipsum justo. Integer consectetur felis vitae nulla maximus mollis. Integer semper eros turpis, in suscipit dolor ullamcorper sit amet.

Cras orci dolor, volutpat in massa sit amet, mollis sagittis lacus. Vivamus facilisis massa vitae condimentum dapibus. Donec enim nunc, blandit et arcu sit amet, scelerisque posuere sapien. Morbi dictum libero quis lacus rutrum, eu vestibulum tellus dignissim. Suspendisse sed magna aliquet mi elementum bibendum. Quisque a neque viverra, blandit mauris quis, egestas diam. Sed vel ullamcorper enim. Fusce consectetur justo et risus sagittis, vel bibendum libero malesuada.

Phasellus pretium ante vel facilisis ullamcorper. Donec non ligula vel magna pellentesque consectetur mattis ac turpis. Ut egestas quam at lorem hendrerit, sit amet cursus lacus faucibus. Curabitur quis lacus dictum urna tincidunt mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus sed imperdiet ex. Aliquam volutpat vitae quam luctus hendrerit. Suspendisse porta nibh et pretium placerat.

Nam congue nulla ac odio pulvinar feugiat. Aliquam hendrerit erat eu venenatis scelerisque. Aenean dapibus sem at iaculis faucibus. Donec fermentum, tellus porttitor porttitor vehicula, justo magna mollis lorem, in vehicula urna dolor id odio. Curabitur mattis lacinia elit, et congue tortor vehicula commodo. Aenean a aliquet nulla. Duis aliquam tempor metus a lobortis. Curabitur facilisis sagittis nibh sed accumsan. Morbi eu tortor neque. Vivamus eget consequat nibh, eget aliquet diam. Sed ornare vehicula mi, non faucibus ligula blandit eu. Donec hendrerit ante nisl, nec porta risus porta eu. Aliquam et justo felis.

Curabitur non sollicitudin tellus. Nam tincidunt, justo aliquet condimentum dictum, nisl odio tincidunt magna, sit amet aliquam quam erat sed neque. Nam sit amet rutrum felis. Nam quis ultrices massa. Praesent et volutpat dolor. Nunc metus augue, venenatis a imperdiet malesuada, gravida id elit. Aenean placerat felis vitae tellus dapibus egestas. Suspendisse sem magna, consequat at pharetra eget, malesuada eu quam. Maecenas diam dui, pretium at dolor eget, auctor iaculis purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent hendrerit volutpat ipsum, at eleifend urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in felis nec velit dictum auctor nec quis urna. Cras auctor ornare ligula.
      </div>

      <div className="chat__footer d-flex flex-row align-center">
        <TextareaControled value={message} onChange={e => updateMessage(e.target.value)}
          placeholder={`Enviar uma mensagem no canal ${location.state.channel.name.toLowerCase()} 🤩`} />
      
        <RoundedButton className="text-color ml-20">
          <Send size={20} />
        </RoundedButton>
      </div>
    </div>
  )
}

export default Channels;