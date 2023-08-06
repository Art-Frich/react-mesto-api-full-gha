import { apiConfig } from "./constants";

/**
 * Класс, содержащий все необходимые fetch-запросы к серверу
 */
class Api {
  /**
   * @constructor
   * @param {string} urlServer
   * @param {string} qUsersMe строка для запроса в users/me
   * @param {string} qCards строка для запроса в cards
   * @param {string} qLikes строка для запроса в likes
   * @param {string} qAvatar строка для запроса в avatar
   */
  constructor({ 
    urlServer, qUsersMe, qCards, qLikes, qAvatar
  }) {
    this._urlServer = urlServer;
    this._qUsersMe = qUsersMe;
    this._qCards = qCards;
    this._qLikes = qLikes;
    this._qAvatar = qAvatar;
    
    this._qLogin = 'signin';
    this._qRegister = 'signup';
    this._qLogout = 'signout'

    this._infoMsg = 'Палундра! Сработал catch внутри Api. У нас проблемы с запросом к серверу! Вот что мы знаем: ';
  }

  /**
   * Позволяет получить данные пользователя, необходимые для рендера связанных разделов
   * @returns response данных пользователя
   */
  getUserInfo() {
    return this._handleFetch(
      fetch( this._urlServer + this._qUsersMe )
    )
  }

  /**
   * Позволяет получить данные обо всех карточках с сервера
   * @returns response начальных карточек
   */
  getInitialCards() {
    return this._handleFetch(
      fetch( this._urlServer + this._qCards )
    )
  }

  /**
   * Позволяет обновить "Имя" и "О себе" пользователя
   * @param {string} newName 
   * @param {string} newAbout 
   * @returns 
   */
  updateUserData( newName, newAbout ) {
    return this._handleFetch(
      fetch( this._urlServer + this._qUsersMe, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newName,
          about: newAbout
        })
      })
    )
  }

  /**
   * Позволяет отправить данные новой карточки на сервер
   * @param {string} namePlace 
   * @param {string} linkImg 
   * @returns response сервера с данными новой карточки
   */
  addNewCard( namePlace, linkImg ) {
    return this._handleFetch(
      fetch( this._urlServer + this._qCards, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: namePlace,
          link: linkImg
        })
      })
    )
  }

  /**
   * Позволяет удалить по id карточку с сервера
   * @param {string} id 
   * @returns response сервера об удалении
   */
  deleteCard( id ) {
    return this._handleFetch(
      fetch( this._urlServer + this._qCards + id, {
        method: 'DELETE',
      })
    )
  }

  /**
   * позволяет установить по id карточки лайк пользователя
   * @param {string} id 
   * @returns response сервера с обновленными данными карточки (лайков)
   */
  setLike( id ){
    return this._handleFetch(
      fetch( this._urlServer + this._qCards + id + this._qLikes, {
        method: 'PUT',
      })
    )
  }

  /**
  * позволяет удалить по id карточки лайк пользователя
  * @param {string} id 
  * @returns response сервера с обновленными данными карточки (лайков)
  */
  deleteLike( id ) {
    return this._handleFetch(
      fetch( this._urlServer + this._qCards + id + this._qLikes, {
        method: 'DELETE',
      })
    )
  }

  changeLikeCardStatus( id, isLiked ){
    return isLiked
      ? this.deleteLike( id )
      : this.setLike( id )
  }

  /**
   * Позволяет обновить аватар пользователя
   * @param {string} newAvatarUrl 
   * @returns response сервера о смене аватара
   */
  updateAvatar( newAvatarUrl ) {
    return this._handleFetch(
      fetch( this._urlServer + this._qUsersMe + this._qAvatar , {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: newAvatarUrl
        })
      })
    )
  }

  createUser( email, password ){
    return fetch( this._urlServer + this._qRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'password': password,
          'email': email
        })
      }).then( res => {
        return !res.ok
        ? Promise.reject( res )
        : res.json();
      })
      .catch( err => {
        if ( err.status === 400 ){
          console.log( this._infoMsg + "некорректно заполнено одно из полей." );
        } else { 
          console.log( this._infoMsg + err.message );
        }
        return Promise.reject();
      })
  }

  logoutUser(){
    return this._handleFetch( 
      fetch( this._urlServer + this._qLogout,{
        method: 'POST',
      })
    );
  }
  
  loginUser( email, password ){
    return fetch( this._urlServer + this._qLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'password': password,
          'email': email
        })
      }).then( res => {
        return !res.ok
        ? Promise.reject( res )
        : res.json();
      })
      .catch( err => {
        if ( err.status === 400 ){
          console.log( this._infoMsg +  "не передано одно из полей." );
        } else if( err.status === 401 ){
          console.log( this._infoMsg + "пользователь с email не найден." );
        } else { 
          console.log( this._infoMsg + err.message );
        }
        return Promise.reject();
      })
  }

  async checkJWT(){
    try {
      const res = await fetch(this._urlServer + this._qUsersMe);
      return await (!res.ok
        ? Promise.reject(res)
        : res.json());
    } catch (err) {
      if (err.status === 400) {
        console.log(this._infoMsg + "Кажется, предыдущая сессия устарели и по ней невозможно авторизоваться. Токен не передан или передан не в том формате.");
      } else if (err.status === 401) {
        console.log(this._infoMsg + "Кажется, предыдущая сессия устарели и по ней невозможно авторизоваться. Переданный токен некорректен.");
      } else {
        console.log(this._infoMsg + "Кажется, вы ранее у вас нет в браузере сохраненной сессии с доступом. " + err.message);
      }
      return Promise.reject();
    }
  }

  _handleFetch( fetch ){
    return fetch
      .then( res => {
        return !res.ok
        ? Promise.reject( res.status )
        : res.json();
      })
      .catch( err => {
        console.log( this._infoMsg + err.message );
        return Promise.reject();
      })
  }
}

export const api = new Api( apiConfig );