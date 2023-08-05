import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup( { isOpen, onClose, onConfirmDelete, fetchCondition } ){
  function handleSubmit( e ){
    e.preventDefault();
    onConfirmDelete();
  }

  return(
    <PopupWithForm 
      name="confirm-delete" 
      title="Вы уверены?" 
      submitBtnText="Да"
      submitBtnTextFetchCondition="Ладно..."
      fetchCondition={ fetchCondition }
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    ></PopupWithForm>
  )
}     