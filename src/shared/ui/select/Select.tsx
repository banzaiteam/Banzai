import * as React from "react";
// import { Select } from "radix-ui";
import * as RadixSelect from "@radix-ui/react-select";
import classnames from "classnames";
import styles from "./Select.module.scss";
import { ArrowIosDownOutline, ArrowIosUp } from "@/assets/icons/components";

type Option = {
  label: string;
  value: string;
  flag?: React.ReactNode;
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
  placeholder = "English",
  onValueChange,
  value,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const defaultValue = value ?? options[0]?.value ?? "";
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  return (
    <div className="select">
      {/*  button that the user clicks to open the dropdown */}
      <RadixSelect.Root
        value={selectedValue}
        onValueChange={(val) => {
          setSelectedValue(val);
          onValueChange?.(val);
        }}
        open={open}
        onOpenChange={setOpen}
      >
        {/* This is the clickable area (like a <button>). When the user clicks it, the dropdown opens. */}
        <RadixSelect.Trigger
          className={classnames(styles.select__box, {
            [styles.disabled]: disabled,
          })}
          aria-label="Select Box"
          disabled={disabled}
          data-state={open ? "open" : "closed"}
        >
          {/* aria-label helps screen readers understand this is a selector */}
          <RadixSelect.Value>
            <span className={styles.item__text}>
              {options.find((o) => o.value === selectedValue)?.flag}
              {options.find((o) => o.value === selectedValue)?.label}
            </span>
          </RadixSelect.Value>
          <RadixSelect.Icon asChild>
            <span className={styles.arrow__icon}>
              {open ? <ArrowIosUp /> : <ArrowIosDownOutline />}
            </span>
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        {/* dropdown opens (after you click the button) */}
        {/* Portal puts the dropdown menu outside the normal DOM tree, so it can float over everything on the screen (like  modal) */}
        {!disabled && (
          <RadixSelect.Portal>
            {/* Content is the box that opens — the full dropdown. */}
            <RadixSelect.Content className={styles.select__dropdown}>
              {/* Viewport — it's where options live */}
              <RadixSelect.Viewport className={styles.Viewport}>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    option={option}
                  />
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        )}
      </RadixSelect.Root>
    </div>
  );
};
/** comments are description in storybook */
//  below is .jsx we neet to make .tsx so we adding two types <
//   React.ComponentRef<typeof RadixSelect.Item>,
//   React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
// >
const SelectItem = React.forwardRef<
  React.ComponentRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item> & { option: Option }
>(({ children, className, option, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      className={classnames(styles.Item, className)}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.ItemText>
        <div className={styles.item__text}>
          {option.flag}
          {option.label}
        </div>
      </RadixSelect.ItemText>
      <RadixSelect.ItemIndicator
        className={styles.ItemIndicator}
      ></RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

export default Select;
