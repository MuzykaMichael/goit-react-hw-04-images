import { useEffect } from "react";
import propTypes from 'prop-types'
import { createPortal } from "react-dom";
import { ModalWindow, ModalWindowContent } from "./Modal.styled";

const rootModal = document.querySelector('#root-modal');

export const Modal = ({onClose,img:{src,alt}}) =>{


    useEffect(()=>{
        const handleClose = evt =>{
            if(evt.code==='Escape') {
                onClose();
            }
            return;
        }
        window.addEventListener('keydown', handleClose)

        return()=>{
            window.removeEventListener('keydown',handleClose)
        }
    },[onClose])




    const handleModalWindowClick = evt =>{
        if (evt.currentTarget === evt.target){
            onClose();
        }
        return;
    }

        

    return createPortal(
        <ModalWindow onClick={handleModalWindowClick}>
            <ModalWindowContent>
                <img src={src} alt={alt}/>
            </ModalWindowContent>
        </ModalWindow>,
        rootModal
    )

}

Modal.propTypes = {
    img:propTypes.shape({
        src:propTypes.string.isRequired,
        alt:propTypes.string.isRequired,
    }).isRequired,
    onClose: propTypes.func.isRequired,
}