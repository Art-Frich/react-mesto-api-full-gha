import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, fetchCondition }){
  const avatarRef = React.useRef();
  const [ isValidForm, setIsValidForm ] = React.useState( false );
  const [ isValidUrl, setIsValidUrl ] = React.useState( true );

  function handleSubmit( e ){
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  function inputChange(e){
    setIsValidUrl( e.target.validity.valid );
    setIsValidForm( e.target.validity.valid );
  }

  React.useEffect( () => {
    avatarRef.current.value = "";
    setIsValidForm( avatarRef.current.validity.valid );
    setIsValidUrl( true )
  }, [ isOpen ])

  return(
    <PopupWithForm 
      name="edit-avatar" 
      title="Обновить аватар" 
      submitBtnText="Сохранить"
      submitBtnTextFetchCondition="Ага... Увидел..."
      fetchCondition={ fetchCondition }
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
      isValidForm={ isValidForm }
    >
      <label className="popup__field">
        <input 
          className={`popup__input popup__input_type_url ${ !isValidUrl ? 'popup__input_type_error' : '' }`}
          name="urlImage" 
          placeholder="Укажите ссылку на новое изображение" 
          type="url" 
          required
          ref={ avatarRef }
          onChange={ inputChange }
        />
        <span className="popup__error">{ !isValidUrl ? avatarRef.current.validationMessage : '' }</span>
      </label>
    </PopupWithForm>
  )
}

