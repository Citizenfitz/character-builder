import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

interface QuestRexDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  className?: string;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

export const QuestRexDialog = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  showFooter = true,
  footerContent,
}: QuestRexDialogProps) => {
  // Ensure the modal and overlay are rendered inside the app container, not the body.
  // This is important for embedding the app in other pages.
  // The modal will render inside #questrex-modal-container if it exists, otherwise fallback to #questrex-root.
  const portalContainer =
    document.getElementById("questrex-modal-container") ||
    document.getElementById("questrex-root");

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal container={portalContainer}>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className={`modal ut-no-print ${className}`}>
          <div className="modal__container">
            <div className="modal__header">
              <Dialog.Title className="modal__h2">{title}</Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="char-sheet__button modal__header-button"
                  aria-label="Close modal"
                >
                  X
                </button>
              </Dialog.Close>
            </div>
            <div className="modal__body">{children}</div>
            {showFooter && (
              <div className="modal__footer">
                {footerContent || (
                  <Dialog.Close asChild>
                    <button className="char-sheet__button char-sheet__button--large">
                      Close
                    </button>
                  </Dialog.Close>
                )}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
