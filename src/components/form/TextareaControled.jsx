import React, { useRef } from "react";

const TextareaControled = props => {
  const { placeholder, value, children, onKeyPress } = props;

  const textAreaRef = useRef(null);

  function onChangeHandler(e) {
    const target = e.target;
    textAreaRef.current.style.height = "43px";
    textAreaRef.current.style.height = `${target.scrollHeight}px`;
    props.onChange(e);
  }

  return (
    <textarea ref={textAreaRef} onChange={onChangeHandler} placeholder={placeholder}
      value={value} className="input__field__textarea" onKeyPress={onKeyPress}>
        {children}
    </textarea>
  );
}

TextareaControled.defaultProps = {
  autofocus: true
}

export default TextareaControled;