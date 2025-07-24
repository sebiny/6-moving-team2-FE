"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const openModal = (content: ReactNode) => {
    setModalContent(content);
  };
  const closeModal = () => {
    setModalContent(null);
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
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}{" "}
      {isOpen && (
        <div onClick={closeModal} className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div onClick={(e) => e.stopPropagation()}>{modalContent}</div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
