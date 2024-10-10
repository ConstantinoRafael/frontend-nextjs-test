import { IToastMessage } from "@/types/toast-message";
import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ToastContextData {
  addToast: (message: Omit<IToastMessage, "id">) => void;
  removeToast: (id: string) => void;
  messages: IToastMessage[];
}

const ToastContext = createContext<ToastContextData | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addToast = (message: Omit<IToastMessage, "id">) => {
    const id = uuidv4();
    setMessages((prev) => [...prev, { ...message, id }]);
  };

  const removeToast = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  return (
    <ToastContext.Provider value={{ messages, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }

  return context;
}
