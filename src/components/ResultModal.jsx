import { forwardRef, useImperativeHandle,useRef } from "react";


const ResultModal = forwardRef(function ResultModal({result,targetTime,remainingTime,onReset},ref){

    const dialog = useRef();

    const hasUserWon = remainingTime > 0;
    const score = Math.round((1-remainingTime/(targetTime * 1000)) * 100);

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
        <p>The target time was <strong>{targetTime}</strong> second{targetTime > 1 ? 's' : ''}.</p>
        {hasUserWon && <p>You stopped the timer with <strong>{remainingTime} seconds left. {/*Score {score}*/}</strong></p>}
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>
})

export default ResultModal;