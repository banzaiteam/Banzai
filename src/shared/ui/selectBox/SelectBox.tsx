export const SelectBox = (props: Props) => {
  return (
    <>
      <label htmlFor="city">Choose a city:</label>
      <select id="city">
        <option value="nyc">New York</option>
        <option value="la">Los Angeles</option>
        <option value="chi">Chicago</option>
      </select>
    </>
  );
};





/*
type Option = {
    label: string;
    value: string;
  };
  
  type Props = {
    label: string;
    id: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
  };
  
  export const SelectBox = ({ label, id, options, value, onChange }: Props) => {
    return (
      <>
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </>
    );
  };