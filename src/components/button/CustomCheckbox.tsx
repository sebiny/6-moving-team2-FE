import React from "react";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function CustomCheckbox({ checked, onChange, className = "" }: CustomCheckboxProps) {
  return (
    <button
      type="button"
      aria-checked={checked}
      className={`w-9 h-9 relative overflow-hidden ${className}`}
      onClick={() => onChange(!checked)}
      tabIndex={0}
    >
      <div className={`w-5 h-5 left-[8px] top-[8px] absolute rounded ${checked ? "bg-red-500" : "bg-white"} transition border border-neutral-200`} />
      {checked && (
        <div className="w-2.5 h-1.5 left-[13px] top-[15px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
      )}
    </button>
  );
}
