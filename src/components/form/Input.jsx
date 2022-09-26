import React from "react";

const Input = ({ label, type, placeholder, disabled, name, register, error }) => {

  const isError = error ? "input--error" : "";

  return (
    <div className={`input ${isError}`}>
      <label className="input__label">{label}</label>
      <input className="input__field" type={type} placeholder={placeholder} disabled={disabled} {...register(name)} />
      {error && <div className="u-text-error u-mt-10 ">{error.message}</div>}
    </div>
  );
}

Input.defaultProps = {
  type: "text"
};

export default Input;