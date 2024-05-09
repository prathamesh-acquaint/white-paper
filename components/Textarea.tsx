import React from "react";

interface PropTypes
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  isError: boolean;
  message: string | undefined;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, PropTypes>(
  ({ id, isError, message, ...rest }, ref) => {
    return (
      <div>
        <textarea
          ref={ref}
          className={`border ${
            isError ? "border-red-500" : "border-gray-500"
          }  focus:outline-none focus:border ${
            isError ? "focus:border-red-500" : "focus:border-indigo-500"
          }  focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 p-2 w-full`}
          id={id}
          {...rest}
        />
        {isError && (
          <p className="mt-2 text-red-500 italic text-xs">{message}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
