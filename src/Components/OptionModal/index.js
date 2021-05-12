import React from 'react';
import ReactModal from 'react-modal';

const OptionModal = (props) => (
        <ReactModal
            isOpen={!!props.modalState}
            onRequestClose= {props.closeModal}
            contentLabel="modal"
        >
            <h3>Modal Title</h3>
            {props.modalState && (
                <p>{props.modalState}</p>
            ) }
           
            <button onClick={props.closeModal}>Close</button>
        </ReactModal>
    )

export default OptionModal;