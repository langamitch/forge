import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-black/70">
          {label}
        </label>
      )}

      <input
        {...props}
        className="
          flex w-full h-10 gap-2
          
          bg-black/5
          px-5
          text-sm font-medium
          placeholder:text-black/40
          ring-offset-background
          focus:ring-2 focus:ring-gray-100
          focus-visible:outline-gray-100
          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-2
          transition
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      />
    </div>
  );
};

export default FormInput;
