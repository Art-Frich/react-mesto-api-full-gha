import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, fetchCondition }){
  const currentUser = React.useContext( CurrentUserContext );
  const [ name, setName ] = React.useState("");
  const [ description, setDescription ] = React.useState("");
  const [ isValidForm, setIsValidForm ] = React.useState( true );
  const [ isValidName, setIsValidName ] = React.useState( true );
  const [ isValidAbout, setIsValidAbout ] = React.useState( true );
  const [ nameValidationMessage, setNameValidationMessage ] = React.useState("");
  const [ aboutValidationMessage, setAboutValidationMessage ] = React.useState("");

  function handleChangeName( e ){
    setName( e.target.value );
    setIsValidName( e.target.validity.valid );
    setNameValidationMessage( e.target.validationMessage );
  }

  function handleChangeAbout( e ){
    setDescription( e.target.value );
    setIsValidAbout( e.target.validity.valid );
    setAboutValidationMessage( e.target.validationMessage );
  }

  function handleSubmit( e ){
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    })
  }

  React.useEffect( () => {
    // || "" - чтобы в состоянии, пока не получены данные о пользователе, React не переживал о некотролируемых input
    setName( currentUser.name || "" );
    setDescription( currentUser.about || "" );
    setIsValidAbout( true );
    setIsValidName( true );
  }, [ currentUser, isOpen ]);

  React.useEffect( () => {
    setIsValidForm( 
      isValidAbout &&
      isValidName &&
      name &&
      description
    );
  }, [isValidAbout, isValidName, name, description]);

  return (
    <PopupWithForm 
      name="edit-profile" 
      title="Редактировать профиль" 
      submitBtnText="Сохранить"
      submitBtnTextFetchCondition="Пытаюсь..."
      fetchCondition={ fetchCondition }
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
      isValidForm={ isValidForm }
    >
      <label className="popup__field">
        <input 
          className={`popup__input popup__input_type_name-user ${ !isValidName ? 'popup__input_type_error' : '' }`}
          name="nameUser" 
          placeholder="Имя или то, что вам его заменит" 
          type="text" 
          minLength={2} 
          maxLength={40} 
          required 
          onChange={ handleChangeName }
          value={ name }
        />
        <span className="popup__error">{ !isValidName ? nameValidationMessage : '' }</span>
      </label>
      <label className="popup__field">
        <input 
          className={`popup__input popup__input_type_about ${ !isValidAbout ? 'popup__input_type_error' : '' }`}
          name="aboutUser" 
          placeholder="Кто вы? Можете оставить это место пустым =)" 
          type="text" 
          minLength={2} 
          maxLength={200} 
          required
          onChange={ handleChangeAbout }
          value={ description }
        />
        <span className="popup__error">{ !isValidAbout ? aboutValidationMessage: '' }</span>
      </label>
    </PopupWithForm>
  )
}

