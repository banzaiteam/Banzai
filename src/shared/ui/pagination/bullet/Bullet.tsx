import styles from './Bullet.module.scss';
import {Icon} from "@shared/ui/icon/Icon";
import type {ReactNode} from "react";


type Props = {

  children?: ReactNode
};
export const Bullet = (props: Props) => {
  return (
    <button
      className={styles.button}
      tabIndex={0}
      role={'button'}
      aria-label={'page 1'}
    >
      {props.children}
    </button>
  );
};