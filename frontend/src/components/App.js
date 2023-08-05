import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './popups/ImagePopup.js';
import EditProfilePopup from './popups/EditProfilePopup.js';
import EditAvatarPopup from './popups/EditAvatarPopup.js';
import AddPlacePopup from './popups/AddPlacePopup.js';
import ConfirmDeletePopup from './popups/ConfirmDeletePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from "./popups/InfoTooltip";
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function App() {
  const [ currentUser, setCurrentUser ] = useState( {} );
  const [ selectedCard, setSelectedCard ] = useState( null );
  const [ cards, setCards ] = useState([]);
  const [ idCardOnDelete, setIdCardOnDelete ] = useState( null );
  const [ fetchCondition, setFetchConditon ] = useState( false );
  const [ email, setEmail ] = useState( '' );
  const [ textInfo, setTextInfo ] = useState( 'Текста ошибки пока нет' );
  const [ isError, setIsError ] = useState( true );

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState( false );
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState( false );
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState( false );
  const [ isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen ] = useState( false );
  const [ isInfoToolTipOpen, setIsInfoToolTipOpen ] = useState( false );

  const [ isRegister, setIsRegister ] = useState( false );
  const [ loggedIn, setLoggedIn ] = useState( false );
  // нужен для transition + "предзагрузка"
  const [ isImgFullPopupOpen, setIsImgFullPopupOpen ] = useState( false ); 

  const location = useLocation();
  const navigate = useNavigate();

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen( true );
  }
  
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen( true );
  }
  
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen( true );
  }

  function handleCardDelete( dataCard ){
    setIsConfirmDeletePopupOpen( true );
    setIdCardOnDelete( dataCard._id );
  }

  function handleCardClick( dataCard ){
    setSelectedCard( dataCard );
    setIsImgFullPopupOpen( true );
  }

  // handleFinalThenCatchDecorator - декоратор, который содержит catch для отлова ошибок
  // также catch есть в виде декоратора непосредственно внутри api и называется _handleFetch
  function handleCardLike( dataCard ){
    const isLiked = dataCard.likes.some( i => i._id === currentUser._id );
    handleFinalThenCatchDecorator(
      api.changeLikeCardStatus( dataCard._id, isLiked )
      .then( newCard => {
        setCards( cards => {
          return cards.map( oldCard => {
            return oldCard._id === newCard._id ? newCard : oldCard
          })
        })
      })
    )
  }

  function handleUpdateUser( newUserData ){
    setFetchConditon( true );
    handleFinalThenCatchDecorator(
      api.updateUserData( newUserData.name, newUserData.about )
      .then( (res) => setCurrentUser( res ))
    )
  }

  function handleUpdateAvatar( newUserAvatar ){
    setFetchConditon( true );
    handleFinalThenCatchDecorator(
      api.updateAvatar( newUserAvatar.avatar )
      .then( (res) => setCurrentUser( res ))
    )
  }

  function handleAddPlaceSubmit( newCardData ){
    setFetchConditon( true );
    handleFinalThenCatchDecorator(
      api.addNewCard( newCardData.namePlace, newCardData.urlPlace )
      .then( (newCard) => setCards( [newCard, ...cards] ))
    )
  }

  function handleConfirmDelete(){
    setFetchConditon( true );
    handleFinalThenCatchDecorator(
      api.deleteCard( idCardOnDelete )
        .then( () => {
          setCards( () => cards.filter( card => card._id !== idCardOnDelete ))
      })
    )
  }

  function onRegister( email, password ){
    setFetchConditon( true );
    api.createUser( email, password )
      .then( () => {
        setIsRegister( true );
        setTextInfo( 'Вы успешно зарегистрировались!' );
        setIsError( false );
      })
      .catch( () => {
        setIsRegister( false );
        setTextInfo( 'Что-то пошло не так! Попробуйте ещё раз.' );
        setIsError( true );
      })
      .finally( () => {
        setIsInfoToolTipOpen( true );
        setFetchConditon( false );
      })
  }

  function onLogin( email, password ){
    setFetchConditon( true );
    api.loginUser( email, password )
      .then( (res) => {
        setLoggedIn( true );
        setEmail( email );
        navigate('/');
      })
      .catch( () => {
        setTextInfo('Не удалось авторизоваться на сервере.');
        setIsError( true );
        setIsInfoToolTipOpen( true );
      })
      .finally( () => {
        setFetchConditon( false )
      })
  }

  function onSignOut(){
    localStorage.removeItem('jwt');
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen( false );
    setIsEditProfilePopupOpen( false );
    setIsAddPlacePopupOpen( false );
    setIsImgFullPopupOpen( false );
    setIsConfirmDeletePopupOpen( false );
    setIsInfoToolTipOpen( false );
    setTimeout( () => setSelectedCard( null ), 150 ); //не удалять данные, пока закрывается
  }

  function handleFinalThenCatchDecorator( promise ){
    return promise
      .then( () => closeAllPopups() )
      .catch( ( err ) => handleRejectMessage( err ) )
      .finally( () => setFetchConditon( false ));
  }

  function handleRejectMessage( err ){
    setIsError( true );
    setTextInfo( 'Капитан, с прискорбием сообщаю: ' + 
      (err || 'что-то пошло не так. Возможно мы попали на мель и нужно ждать прилива интернета.') 
    );
    setIsInfoToolTipOpen( true );
  }

  const getData = async () => {
    try {
      const userData = await api.getUserInfo();
      setCurrentUser( userData );
      const dataCard =  await api.getInitialCards();
      setCards( dataCard );
    } catch( err ) {
      handleRejectMessage( err );
    }
  };

  React.useEffect( () => {
    api.checkJWT()
      .then( (res) => {
        setLoggedIn( true );
        setEmail( res.data.email );
        navigate('/');
      })
      .catch( () => console.log('Не удалось авторизоваться на сервере.'));
      // eslint-disable-next-line
  }, []);

  React.useEffect( () => {
    if ( loggedIn ) {
      getData();
    }
    // eslint-disable-next-line
  }, [ loggedIn ] );

  React.useEffect(() => {
    if ( isInfoToolTipOpen === false && 
         isRegister === true && 
         location.pathname === '/sign-up') {
      navigate( '/sign-in');
      setIsRegister( false );
    }
    // eslint-disable-next-line
  }, [isInfoToolTipOpen] );

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header email={ email } onSignOut={ onSignOut } />
      <Routes>
        <Route path='/sign-in' element={ 
          <Login 
            onSubmit={ onLogin }
            fetchCondition={ fetchCondition }
          /> 
        } />
        <Route path='/sign-up' element={ 
          <Register 
            onSubmit={ onRegister }
            isOpen={ isInfoToolTipOpen }
            onClose={ closeAllPopups }
            isRegister={ isRegister }
            fetchCondition={ fetchCondition }
          /> 
        } />
        <Route path='/' element={<ProtectedRoute element={ Main }
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          loggedIn={ loggedIn } />
        } />
        <Route path='*' element={ <Navigate to='/sign-in' /> } />
      </Routes>
      <Footer />

      <EditProfilePopup 
        isOpen={ isEditProfilePopupOpen } 
        onClose={ closeAllPopups }
        onUpdateUser={ handleUpdateUser }
        fetchCondition={ fetchCondition }
      />
      <EditAvatarPopup 
        isOpen={ isEditAvatarPopupOpen }
        onClose={ closeAllPopups }
        onUpdateAvatar={ handleUpdateAvatar }
        fetchCondition={ fetchCondition }
      />
      <AddPlacePopup
        isOpen={ isAddPlacePopupOpen }
        onClose={ closeAllPopups }
        onAddPlace={ handleAddPlaceSubmit }
        cards={ cards }
        fetchCondition={ fetchCondition }
      />
      <ConfirmDeletePopup 
        isOpen={ isConfirmDeletePopupOpen }
        onClose={ closeAllPopups }
        onConfirmDelete={ handleConfirmDelete }
        fetchCondition={ fetchCondition }
      />
      <InfoTooltip 
        isOpen={ isInfoToolTipOpen } 
        onClose={ closeAllPopups } 
        isError={ isError }
        text={ textInfo }
      />
      <ImagePopup 
        card={selectedCard}
        onClose={ closeAllPopups }
        isOpen={isImgFullPopupOpen}
      />

    </CurrentUserContext.Provider>
  );
}