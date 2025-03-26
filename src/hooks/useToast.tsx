"use client";

import { EventEmitter } from "events";
import { useState, useEffect, useRef, useCallback } from "react";

import { CancelIcon, CheckedIcon, ErrorIcon } from "../components/Icons";

export type Variants = "success" | "error";

type ToastProps = {
  info?: ToastType;
  visible: boolean;
};

type ToastType = {
  message: string;
  variants: Variants;
};

const toastEventEmitter = new EventEmitter();
const showToast = (toast: ToastType) => {
  toastEventEmitter.emit("showToast", toast);
};
const onShowToast = (callback: (toast: ToastType) => void) => {
  toastEventEmitter.on("showToast", callback);
};

// Toast component
const Toast: React.FC = () => {
  const [toast, setToast] = useState<ToastProps>({
    info: undefined,
    visible: false,
  });

  const { message, variants } = toast.info || {};
  const duration = 5000;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleShowToast = useCallback(
    (data: ToastType) => {
      setToast({ info: data, visible: true });
      clearTimer();
      timerRef.current = setTimeout(() => {
        setToast({ info: undefined, visible: false });
      }, duration);
    },
    [clearTimer, duration],
  );

  useEffect(() => {
    onShowToast(handleShowToast);
    return () => {
      toastEventEmitter.removeListener("showToast", handleShowToast);
      clearTimer();
    };
  }, [clearTimer, handleShowToast]);

  useEffect(() => {
    if (toast.visible) {
      timerRef.current = setTimeout(() => {
        setToast({ info: undefined, visible: false });
      }, duration);
    }
    return () => clearTimer();
  }, [toast.visible, clearTimer]);

  const removeToast = () => {
    setToast({ info: undefined, visible: false });
    clearTimeout(timerRef.current!);
  };

  const toastVariant = {
    success: "bg-white text-black border-2 border-primary",
    error: "bg-red-500 text-white",
  };

  const userVariants = toastVariant[variants!];

  return (
    toast.visible && (
      <div
        className={`${
          userVariants
        } group shadow-story-card animate-in slide-in-from-top fixed top-1.5 bottom-auto left-1/2 z-[100] flex -translate-x-1/2 translate-y-0 items-center justify-between gap-2 rounded-[12px] px-6 py-4 transition-transform sm:!w-fit sm:!max-w-[500px]`}
      >
        <div>{variants === "success" ? <CheckedIcon /> : <ErrorIcon />}</div>
        <p className="font-medium">{message}</p>

        <button
          className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-[1]"
          onClick={removeToast}
        >
          <CancelIcon fill={variants === "success" ? "red" : "white"} />
        </button>
      </div>
    )
  );
};

export { Toast, showToast };
