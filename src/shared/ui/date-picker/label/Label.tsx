import styles from './Label.module.scss'

type Props = {
  label: string;
  id: string
  disabled: boolean
  required: boolean;
}

export const Label:React.FC<Props> = (
  { 
    id, 
    disabled, 
    required, 
    label 
  }) => {
  const combinedClasses = `${disabled ? styles['label-disabled'] : styles.label}`

  return label ? (
    <>
      <label htmlFor={`datepicker-${id}`} 
             className={combinedClasses}>
        {label}
        {required && <span>*</span>}
      </label>
    </>
  ) : null
}
