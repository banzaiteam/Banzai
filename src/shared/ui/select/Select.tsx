import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
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
  onValueChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  size?: "default" | "small";
};

const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  onValueChange,
  value,
  disabled = false,
  size = "default",
}) => {
  const [open, setOpen] = React.useState(false);

  const findOption = options.find((o) => o.value === value);

  return (
    <div className="select">
      {/*  button that the user clicks to open the dropdown */}
      <RadixSelect.Root
        value={value}
        onValueChange={onValueChange}
        open={open}
        onOpenChange={setOpen}
      >
        {/* This is the clickable area (like a <button>). When the user clicks it, the dropdown opens. */}
        <RadixSelect.Trigger
          className={`${styles.select__box} ${
            disabled ? styles.disabled : ""
          } ${size === "small" ? styles.small : ""}`}
          aria-label="Select Box"
          disabled={disabled}
          data-state={open ? "open" : "closed"}
        >
          {/* aria-label helps screen readers understand this is a selector */}
          <RadixSelect.Value>
            <span className={styles.item__text}>
              {findOption?.flag || null}
              <span className={styles.item__label}>{findOption?.label}</span>
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
            <RadixSelect.Content
              className={`${styles.select__dropdown} ${
                size === "small" ? styles.small : ""
              }`}
            >
              {/* Viewport — it's where options live */}
              <RadixSelect.Viewport
                className={`${styles.Viewport} ${
                  size === "small" ? styles.small : ""
                }`}
              >
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    option={option}
                    size={size}
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
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item> & {
    option: Option;
    size?: "default" | "small";
  }
>(({ children, className, option, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      className={`${styles.Item} ${className ?? ""}`}
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

// uncomment for testing for numbers select box and pass it for parent;
// const [numberValue, setNumberValue] = useState("100");
// const numberOptions = [
//   { label: "10", value: "10" },
//   { label: "20", value: "20" },
//   { label: "30", value: "30" },
//   { label: "50", value: "50" },
//   { label: "100", value: "100" },
// ];
