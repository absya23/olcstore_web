import React from "react";
import { useController } from "react-hook-form";

const Input = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      className="w-full input py-3 mb-1 px-4 border border-[#cbb9c4] outline-none focus:border-primary"
      {...field}
      {...props}
    />
  );
};

export default Input;
