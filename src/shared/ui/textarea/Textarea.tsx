import React from 'react';
import clsx from 'clsx';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  errorMessage?: string;
};

export const Textarea: React.FC<Props> = ({
                                            className = '',
                                            error = false,
                                            errorMessage,
                                            disabled,
                                            ...rest
                                          }) => {
  return (
    <div className="relative w-full">
      <textarea
        className={clsx(
          `w-full min-h-[84px] rounded-sm bg-dark-500 text-light-900 
          text-base font-normal leading-[150%] p-[6px_12px] 
          placeholder-light-900 
          focus:outline-none focus:ring-0`,
          {
            'border border-dark-100': !error && !disabled,
            'hover:border-dark-100 hover:text-light-900': !error && !disabled,
            'focus:border-2 focus:border-primary-700 focus:text-light-100': !error && !disabled,
            'active:border-light-100 active:text-light-100': !error && !disabled,
            'border border-danger-500 text-light-100': error,
            'border border-dark-100 text-dark-100 bg-dark-500 cursor-not-allowed': disabled,
          },
          className
        )}
        disabled={disabled}
        {...rest}
      />
      {error && errorMessage && (
        <div className="absolute left-0 -bottom-5 text-danger-500 text-sm leading-[171%] font-normal">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
