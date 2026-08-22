import React from 'react';

export default function Input({ label, id, type = 'text', placeholder, rightElement, labelRight, ...props }) {
  return (
    <div className="flex flex-col mb-4 w-full">
      <div className="flex justify-between items-center mb-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-bold text-gray-900 tracking-wide">
            {label}
          </label>
        )}
        {labelRight && <div className="text-xs">{labelRight}</div>}
      </div>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-xl py-3.5 px-4 focus:outline-none focus:border-[var(--primary)] transition-colors text-sm bg-white"
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

