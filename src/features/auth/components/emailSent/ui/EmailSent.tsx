"use client";
import { Button, Card } from "@/shared/ui";
import styles from "./EmailSent.module.scss";
import { CloseOutline } from "@/assets/icons/components";
import { useState } from "react";

interface Props {
  email: string;
}

const EmailSent: React.FC<Props> = ({ email }) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className={styles.emailSent}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <p className={styles.text}>Email sent</p>
          <CloseOutline
            onClick={() => setShow(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={styles.body}>
          <div className={styles.confirmation}>
            We have sent a link to confirm your email to
            <p>{email}</p>
          </div>
          <div className={styles.actions}>
            <Button variant="primary" onClick={() => setShow(false)}>
              OK
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmailSent;
