import React, { useEffect, useRef } from "react";

import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    footerContent: React.ReactNode | null;
    title: string | null;
    closeModal: () => void;
    type: "standard" | "drawer"
}

// ***** INSTRUKTIONER *****
// *** - Man hanterar denna modalen utifrån med ett state *isOpen* (bolean)
// *** - closeModal är funktonen som bör sätta statet till False.
// *************************

// Funktionell React-komponent för en modal
const Modal: React.FC<ModalProps> = ({
    isOpen,
    children,
    closeModal,
    title,
    footerContent,
    type = "standard"
}) => {
    // spara dialogelementet i en variabel
    const dialogElement = useRef<HTMLDialogElement | null>(null);

    // useEffect(() => console.log(dialogElement.current))

    // när isopen förändras kollar vi av om modalen ska vara öppen synlig eller ej:
    useEffect(() => {
        if (!dialogElement.current) return;

        const dialog = dialogElement.current;

        if (isOpen && !dialog.open) {
            dialog.showModal();
            // Blockera scroll på body
            document.body.style.overflow = "hidden";
        } else if (!isOpen && dialog.open) {
            dialog.close();
            // Återställ scroll på body
            document.body.style.overflow = "";
        }


        // Stänger modal vid klick utanför innehållet, dvs dialogelementet.
        function handleClickOutside(event: MouseEvent) {
            if (event.target === dialog) {
                closeModal();
            }
        }
        // Stänger nollställer state vis cancel så att stat inte fortfarande tror att modalen är öppen :)
        function handleCancel() {
            closeModal();
        }



        // lyssnare:
        dialog.addEventListener("click", handleClickOutside);
        dialog.addEventListener("cancel", handleCancel);

        // Cleanup
        return () => {
            dialog.removeEventListener("click", handleClickOutside);
            dialog.removeEventListener("cancel", handleCancel);
            // Återställ alltid scroll när cleanup sker
            document.body.style.overflow = "";
        };
    }, [closeModal, isOpen]);

    return (
        <dialog ref={dialogElement} className={` ${styles.dialog}  `}>
            <div className={`  ${styles.contentContainer} ${type == "drawer" && styles.drawer}`}>
                <div className={styles.header}>

                    <span className={styles.title}><h3 >{title}</h3></span>
                    <button className={styles.closeButton} onClick={closeModal}> &#10005;</button>
                </div>
                <div className={styles.main}>
                    {children}
                </div>

                {footerContent && <div className={styles.footer}>
                    {footerContent}
                </div>}

                {/* extra marginal ner mot enhetens  kand om det är en wrawer vi har att göra med :) */}
                {type == "drawer" &&
                    <div style={{
                        height: "2rem"
                    }} />}

            </div>
        </dialog >
    );
};

export default Modal;
