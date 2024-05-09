import React from "react";

interface PropTypes
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  btnType?: "primary" | "secondary";
}

const Button = ({ text, btnType = "primary", ...rest }: PropTypes) => {
  if (btnType === "primary") {
    return (
      <button
        type="submit"
        className="bg-primary hover:bg-hover-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        {...rest}
      >
        {text}
      </button>
    );
  } else if (btnType === "secondary") {
    return (
      <button
        className="bg-secondary hover:bg-hover-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        {...rest}
      >
        {text}
      </button>
    );
  }
  return (
    <button
      type="submit"
      className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
