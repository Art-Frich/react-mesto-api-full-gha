import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({ 
  onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete ,cards 
}){
  const currentUser = React.useContext( CurrentUserContext )

  return(
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container ">
          <div className="profile__avatar-cover">
            <button 
              className="profile__avatar-edit button-zeroing" 
              onClick={ onEditAvatar }
              aria-label="edit profile"
            />
          </div>
          <img src={ currentUser.avatar } alt="Ваше изображение" className="profile__avatar" />
        </div>
        <div className="profile__text-about">
          <div className="profile__title-container">
            <h1 
              className="profile__title-name text-overflow" 
              name="curNameUser">
              { currentUser.name }
            </h1>
            <button 
              className="profile__btn-edit button-zeroing transition-opacity" 
              type="button" 
              name="Изменить описание профиля" 
              onClick={ onEditProfile }
              aria-label="edit data of profile"
            />
          </div>
          <p 
            className="profile__subtitle text-overflow" 
            name="curAboutUser"
          >
            { currentUser.about }
          </p>
        </div>
        <button 
          className="profile__btn-add button-zeroing transition-opacity" 
          type="button" 
          name="Добавить место" 
          onClick={ onAddPlace }
          aria-label="add new card-place"
        />
      </section>
      <section className="cards">
        <ul className="cards__grid">
          { cards.map( (item) => (
            item 
            ?
              <li className="cards__grid-item" key={ item._id }>
                <Card 
                  dataCard={item} 
                  onCardClick={onCardClick} 
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            : 
              <></>)) 
          }
        </ul>
      </section>
    </main>
  )
}