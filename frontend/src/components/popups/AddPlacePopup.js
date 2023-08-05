import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, cards, fetchCondition }){
  const [ isValidForm, setIsValidForm ] = React.useState( false );
  const [ isValidName, setIsValidName ] = React.useState( true );
  const [ isValidUrl, setIsValidUrl ] = React.useState( true );
  const namePlaceRef = React.useRef();
  const urlPlaceRef = React.useRef();

  function handleSubmit( e ){
    e.preventDefault();
    onAddPlace( {
      namePlace: namePlaceRef.current.value,
      urlPlace: urlPlaceRef.current.value
    })
  }

  function checkFormValidity(){
    setIsValidForm( 
      namePlaceRef.current.validity.valid &&
      urlPlaceRef.current.validity.valid &&
      namePlaceRef.current.value &&
      urlPlaceRef.current.value
    );
  }

  function handleChangeName(){
    setIsValidName( namePlaceRef.current.validity.valid );
    checkFormValidity();
  }

  function handleChangeUrl(){
    setIsValidUrl( urlPlaceRef.current.validity.valid );
    checkFormValidity();
  }

  React.useEffect( () => {
    namePlaceRef.current.value = "";
    urlPlaceRef.current.value = "";
  }, [ cards ]);

  React.useEffect( () => {
    checkFormValidity();
  }, [ isOpen ]);

  return(
    <PopupWithForm 
      name="add-place" 
      title="Новое место" 
      submitBtnText="Создать"
      submitBtnTextFetchCondition="Пытаюсь..."
      fetchCondition={ fetchCondition }
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
      isValidForm={ isValidForm }
    >
      <label className="popup__field">
        <input 
          className={`popup__input popup__input_type_name-place ${ !isValidName ? 'popup__input_type_error' : '' }`}
          name="namePlace" 
          placeholder="Как называется это место?" 
          type="text" 
          minLength={2} 
          maxLength={30} 
          required
          ref={ namePlaceRef }
          onChange={ handleChangeName }
        />
        <span className="popup__error">{ !isValidName ? namePlaceRef.current.validationMessage : '' }</span>
      </label>
      <label className="popup__field">
        <input 
          className={`popup__input popup__input_type_url ${ !isValidUrl ? 'popup__input_type_error' : '' }`}
          name="urlImage" 
          placeholder="Укажите ссылку на изображение" 
          type="url" 
          required
          ref={ urlPlaceRef }
          onChange={ handleChangeUrl }
        />
        <span className="popup__error">{ !isValidUrl ? urlPlaceRef.current.validationMessage : '' }</span>
      </label>
    </PopupWithForm>
  )
}