import React, { TextareaHTMLAttributes } from "react";

interface FormTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  rows?: number;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  placeholder,
  rows = 4,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className=" ">{label}</label>
      )}
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...props}
        className="
          w-full
          px-3 py-2
          
          rounded-sm
          text-[16px]
          sans
          font-medium
          tracking-tight
          text-black
          resize-none
      
          focus:ring-2 focus:ring-blue-300
          focus:border-transparent
          transition
        "
      />
    </div>
  );
};

export default FormTextArea;
