import React from "react";
import * as Toast from "@radix-ui/react-toast";
import styles from "./AlertToast.module.scss";
import { Close } from "@/assets/icons/components";

type Props = {
  status: "success" | "error";
  message: string;
  hasCloseButton?: boolean;
  duration?: number;
}

export const AlertToast = ({ status, message, hasCloseButton = false, duration = Infinity }: Props) => {
  const renderMessage = () => {
    if (status !== 'error') {
      return message
    }
    
    const words = message.split(' ');
    const firstWord = words[0] + ' ';
    const restWords = words.slice(1).join(' ');
    
    return (
      <>
        <span className={styles['first-word']}>{firstWord}</span>
        {restWords}
      </>
    );
  };

  return (
    <Toast.Provider>
      <Toast.Root className={`${styles.toast} ${styles[status]}`} duration={duration}>
        <Toast.Description className={styles.description}>
          {renderMessage()}
        </Toast.Description>
        {hasCloseButton && (
        <Toast.Action asChild altText="Close notification" className={styles['close-button']}>
          <Close />
        </Toast.Action>
        )}
      </Toast.Root>
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
};