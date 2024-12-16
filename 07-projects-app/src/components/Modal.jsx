import { createPortal } from "react-dom";
import { useRef, useImperativeHandle } from "react";
import Button from "./Button";

export default function Modal({ref, buttonCaption, children}) {

    const modalRef = useRef();

    useImperativeHandle(ref, ()=>{

        return {

            open() {
                modalRef.current.showModal();
            }
        }
    });

    return createPortal(

        <dialog ref={modalRef} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">

            {children}

            <form method="dialog" className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>, document.getElementById("modal-root")
    )
}