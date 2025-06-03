import React, { useEffect, useRef } from "react";

import styles from "./Modal.module.css";
import "./noScroll.css";

import { X } from 'react-feather';

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    footerContent: React.ReactNode | null;
    title: string | null;
    onCloseModal: () => void;
    type: "standard" | "drawer"
    size: "small" | "large"
}

// ***** INSTRUKTIONER *****
// *** - Man hanterar denna modalen utifrån med ett state *isOpen* (bolean)
// *** - onCloseModal är funktonen som bör sätta statet till False (och eventuellt annat som ska ske vid stängning).
// ***
// ***  [Info:]
// ***   Drawer är bara drawer i mobil-breakpoint.
// ***   Size avgör hur brett innehållet tillåts bli.
// *************************

// Funktionell React-komponent för en modal
const Modal: React.FC<ModalProps> = ({
    isOpen,
    children,
    onCloseModal,
    title,
    footerContent,
    type = "standard",
    size = "small"
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
            // Blockera scroll på body (global klass)
            document.body.classList.add("no-scroll");
        } else if (!isOpen && dialog.open) {
            dialog.close();
            // Återställ scroll på body (global klass)
            document.body.classList.remove("no-scroll");
        }

        // Stänger modal vid klick utanför innehållet, dvs dialogelementet.
        function handleClickOutside(event: MouseEvent) {
            if (event.target === dialog) {
                onCloseModal();
            }
        }
        // Stänger nollställer state vis cancel så att stat inte fortfarande tror att modalen är öppen :)
        function handleCancel() {
            onCloseModal();
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
    }, [onCloseModal, isOpen]);

    // klass att sätta bredden på  innehållet med:
    const sizeClass = size === "small"
        ? styles.small
        : size === "large"
            ? styles.large
            : "";


    return (
        <dialog ref={dialogElement} className={` ${styles.dialog}  `}>
            <div className={`${styles.contentContainer} ${type == "drawer" && styles.drawer}`}>


                <div className={styles.header}>
                    <span className={`${styles.title}`}>
                        <h3>{title}</h3>
                    </span>

                    <button className={styles.closeButton} onClick={onCloseModal}>
                        <X size={"1.5rem"} />
                    </button>
                </div>


                <div className={`${styles.mainOuterContainer} ${sizeClass} ${size === "small"
                    ? styles.small
                    : size === "large"
                        ? styles.large
                        : ""}`} >
                    {/* outer containers uppgift är att skrolla Innercontainern och hålla fast fadern sticky vid sina kanter */}
                    <div className={styles.faderTop}></div>
                    <div className={styles.mainInnerContainer}>
                        {children}
                    </div>
                    <div className={styles.faderBottom}></div>
                </div>


                {footerContent && <div className={`${styles.footer} ${sizeClass}`} >
                    {footerContent}
                </div>}



            </div>



        </dialog >
    );
};

export default Modal;
