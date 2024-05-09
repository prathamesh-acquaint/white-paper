import React from "react";

interface PropTypes
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: {
    name: string;
    value: string;
  }[];
  isError: boolean;
  message: string | undefined;
}

const Select = React.forwardRef<HTMLSelectElement, PropTypes>(
  ({ options, id, isError, message, ...rest }, ref) => {
    return (
      <div>
        <select
          ref={ref}
          className={`border ${
            isError ? "border-red-500" : "border-gray-500"
          }  focus:outline-none focus:border ${
            isError ? "focus:border-red-500" : "focus:border-indigo-500"
          }  focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 p-2 w-full`}
          id={id}
          {...rest}
        >
          <option value="">Select an option</option>
          {options?.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.name}
            </option>
          ))}
        </select>
        {isError && (
          <p className="mt-2 text-red-500 italic text-xs">{message}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
