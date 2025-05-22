import * as React from "react";
// import { Select } from "radix-ui";
import * as RadixSelect from "@radix-ui/react-select";
import classnames from "classnames";
// import {
//   CheckIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
// } from "@radix-ui/react-icons";
import styles from "./Select.module.scss";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
};

const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  onValueChange,
  value,
  disabled = false,
}) => (
  <div className="select">
    {/*  button that the user clicks to open the dropdown */}
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      {/* This is the clickable area (like a <button>). When the user clicks it, the dropdown opens. */}
      <RadixSelect.Trigger
        className={classnames(styles.select__box, {
          [styles.disabled]: disabled,
        })}
        aria-label="Select Box"
        disabled={disabled}
      >
        {/* aria-label helps screen readers understand this is a selector */}
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className={styles.Icon}>
          {/* <ChevronDownIcon /> */}
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      {/* dropdown opens (after you click the button) */}
      {/* Portal puts the dropdown menu outside the normal DOM tree, so it can float over everything on the screen (like  modal) */}
      {!disabled && (
        <RadixSelect.Portal>
          {/* Content is the box that opens — the full dropdown. */}
          <RadixSelect.Content className={styles.select__dropdown}>
            {/* <ChevronUpIcon /> */}
            {/* Viewport — it's where options live */}
            <RadixSelect.Viewport className={styles.Viewport}>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      )}
    </RadixSelect.Root>
  </div>
);

/** comments are description in storybook */
//  below is .jsx we neet to make .tsx so we adding two types <
//   React.ComponentRef<typeof RadixSelect.Item>,
//   React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
// >
const SelectItem = React.forwardRef<
  React.ComponentRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      className={classnames(styles.Item, className)}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className={styles.ItemIndicator}>
        {/* <CheckIcon /> */}
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

export default Select;
