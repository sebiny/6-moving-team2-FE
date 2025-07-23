"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ModalContextType {
  openModal: (type: "default" | "dropdown", content: ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
  modalType: "default" | "dropdown" | null;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("");
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalType, setModalType] = useState<"default" | "dropdown" | null>(null);
  const openModal = (type: "default" | "dropdown", content: ReactNode) => {
    setModalType(type);
    setModalContent(content);
  };
  const closeModal = () => {
    setModalContent(null);
    setModalType(null);
  };
  const isOpen = modalContent !== null;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, modalType }}>
      {children}{" "}
      {isOpen && modalType === "default" && (
        <div onClick={closeModal} className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div onClick={(e) => e.stopPropagation()}>{modalContent}</div>
        </div>
      )}
      {isOpen && modalType === "dropdown" && (
        <div onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()}>{modalContent}</div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
