import React from "react";

interface PropTypes
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isError: boolean;
  message: string | undefined;
}

const Input = React.forwardRef<HTMLInputElement, PropTypes>(
  ({ type, id, isError, message, ...rest }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={`border ${
            isError ? "border-red-500" : "border-gray-500"
          }  focus:outline-none focus:border ${
            isError ? "focus:border-red-500" : "focus:border-indigo-500"
          }  focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 p-2 w-full`}
          id={id}
          type={type}
          {...rest}
        />
        {isError && (
          <p className="mt-2 text-red-500 italic text-xs">{message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
