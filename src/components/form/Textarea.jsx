import React, { useRef } from "react";

export default function Textarea(props) {
  const textAreaRef = useRef(null);

  const { label, rows, placeholder, name, register, error } = props;

  const isError = error ? "input--error" : "";

  function onChangeHandler(e) {
    const target = e.target;
    textAreaRef.current.style.height = "45px";
    textAreaRef.current.style.height = `${target.scrollHeight}px`;
    props.onChange(e);
  }

  return (
    <div className={`input ${isError}`}>
      <label className="input__label">{label}</label>
      <textarea rows={rows} ref={textAreaRef} onChange={onChangeHandler}
        className="input__field input__field--textarea" placeholder={placeholder} name={name} {...register(name)}>
        {props.children}
      </textarea>
    </div>
  );
}