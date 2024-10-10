import { useEffect } from "react";

import { IToastMessage } from "@/types/toast-message.d";

import styles from "./style.module.css";
import { useToast } from "@/context/toast-context";

type ToastMessageProps = {
  content: IToastMessage;
};

export const ToastMessage: React.FC<ToastMessageProps> = ({
  content: data,
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(data.id);
    }, data.duration || 3000);

    return () => clearTimeout(timer);
  }, [data, removeToast]);

  return (
    <div
      className={styles.container}
      data-toast-type={data.type}
      data-toast-id={data.id}
    >
      <span data-content>{data.message}</span>

      <span data-close onClick={() => removeToast(data.id)}>
        ╳
      </span>
    </div>
  );
};
