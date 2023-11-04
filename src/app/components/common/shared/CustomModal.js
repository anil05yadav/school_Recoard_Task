import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import * as Images from "../../../../utilities/images";
const CustomModal = (props) => {
  const [show, setShow] = useState(props.showModal);

  const handleClose = () => {
    setShow(false);
    if (props.onCloseModal) {
      props.onCloseModal();
    }
  }

  return (
    <Modal
      show={show}
      onHide={()=> {handleClose()}}
      backdrop={props.backdrop ?? false }
      keyboard={false}
      centered
      size={props.size}
      id={props.ids}
      dialogClassName={props.isRightSideModal ? "modal-dialog-slideout" : ""}
      className={props.isRightSideModal ? 'pe-0' : ''}
      animation={true}
    >
    {(props.header || props.showCloseBtn) ?
      <Modal.Header >
        {props.header} 
        {/* {props.title ?
          <Modal.Title>{props.title}</Modal.Title>
          :
          ""
        } */}
        {props?.showCloseBtn === "hide" ? <></>:<img src={Images.crossIcon} onClick={()=> {handleClose()}} alt="crossicon" className="crossIcon"/> }
      </Modal.Header>
      :
      ""
    }  
    <Modal.Body className={props.isRightSideModal ? "p-0" : ""}>
      {props.child}
    </Modal.Body>
    {props.footerContent ?
      <Modal.Footer className={props.footerClasses}>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close Modal
        </Button> */}
        {props.footerContent}
      </Modal.Footer>
      :
      ""
    }
    </Modal>
  );
};

export default CustomModal;
