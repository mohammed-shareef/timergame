import { forwardRef, useImperativeHandle,useRef } from "react";


const ResultModal = forwardRef(function ResultModal({result,targetTime},ref){

    const dialog = useRef();

    useImperativeHandle(ref,()=>{
    return {
        //Abstracting the showModal using an open method to show a modal dialog as 
        //the developer can decide to change the dialog to a div and in that case
        // the showModal will not work.
        open(){
          dialog.current.showModal();
        }
    }
    });

    return <dialog ref={dialog} className="result-modal">
        <h2>You {result}</h2>
        <p>The target time was <strong>{targetTime}</strong> seconds.</p>
        <p>You stopped the timer with <strong>X seconds left.</strong></p>
        <form method="dialog">
            <button>Close</button>
        </form>
    </dialog>
})

export default ResultModal;