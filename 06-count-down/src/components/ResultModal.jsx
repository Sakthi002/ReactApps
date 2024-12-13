import { useImperativeHandle, useRef } from "react";
import {createPortal} from "react-dom";

export default function ResultModal({ ref, remainingTime, targetTime, onReset }) {

    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedTime = (remainingTime / 1000).toFixed(2); 
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {

        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(

        <dialog ref={dialog} className="result-modal" onClose={onReset}>

            { userLost && <h2>You lost</h2> }
            { !userLost && <h2>Your score : {score}</h2> }

            <p>The target time was <b>{targetTime} seconds.</b></p>

            <p>You stopped the timer with <b>{formattedTime} seconds left.</b></p>

            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
}