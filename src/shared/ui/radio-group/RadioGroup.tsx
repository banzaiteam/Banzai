import React, { ChangeEvent, forwardRef, useId } from 'react';
import cx from 'clsx';
import styles from './RadioGroup.module.scss';

export interface RadioOption {
    id?: string;
    value: string;
    label: string;
    disabled?: boolean;
}

export interface RadioGroupProps {
    name: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    error?: string;
    disabled?: boolean;
    orientation?: 'vertical' | 'horizontal';
    className?: string;
    id?: string;
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
    (
        {
            name,
            options,
            value,
            onChange,
            label,
            error,
            disabled = false,
            orientation = 'horizontal',
            className,
            id: externalId,
            ...rest
        },
        ref
    ) => {
        const generatedId = useId();
        const groupId = externalId || `radio-group-${generatedId}`;

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (!disabled && onChange) {
                onChange(e.target.value);
            }
        };

        return (
            <fieldset
                ref={ref}
                id={groupId}
                className={cx(
                    styles.radioGroup,
                    styles[orientation],
                    {
                        [styles.disabled]: disabled,
                        [styles.error]: !!error
                    },
                    className
                )}
                disabled={disabled}
                {...rest}
            >
                {label && (
                    <legend className={styles.legend}>{label}</legend>
                )}

                <div className={styles.options} role="radiogroup">
                    {options.map((option) => {
                        const radioId = option.id || `${name}-${option.value}-${generatedId}`;
                        const isChecked = value === option.value;
                        const isDisabled = disabled || option.disabled;

                        return (
                            <label
                                key={option.value}
                                htmlFor={radioId}
                                className={cx(
                                    styles.radioLabel,
                                    {
                                        [styles.checked]: isChecked,
                                        [styles.optionDisabled]: isDisabled
                                    }
                                )}
                            >
                                <input
                                    type="radio"
                                    id={radioId}
                                    name={name}
                                    value={option.value}
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onChange={handleChange}
                                    className={styles.radioInput}
                                    aria-checked={isChecked}
                                    tabIndex={isDisabled ? -1 : 0}
                                />
                                <span className={styles.radioControl}></span>
                                <span className={styles.radioText}>{option.label}</span>
                            </label>
                        );
                    })}
                </div>

                {error && (
                    <p className={styles.errorText}>{error}</p>
                )}
            </fieldset>
        );
    }
);

RadioGroup.displayName = 'RadioGroup';