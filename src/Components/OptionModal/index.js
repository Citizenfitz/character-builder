import React from "react";
import { QuestRexDialog } from "../Common/Dialog";

const OptionModal = (props) => (
  <QuestRexDialog
    isOpen={!!props.modalState}
    onClose={props.closeModal}
    title="Modal Title"
  >
    {props.modalState && <p>{props.modalState}</p>}
  </QuestRexDialog>
);

export default OptionModal;
