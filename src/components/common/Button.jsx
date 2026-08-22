import React from 'react';

export default function Button({ children, type = 'button', onClick, className = '', fullWidth = false, disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[var(--primary)] text-white font-bold py-3 px-4 rounded-full transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

