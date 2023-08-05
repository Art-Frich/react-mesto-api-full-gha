// Если карточка пока не выбрана, то установить параметры-заглушки,
// Такая логика необходима для корректной работы transition: 
// карточка всегда существует, но меняется видимость, когда поступают данные
export default function ImagePopup( {card, onClose, isOpen} ){
  if ( !card ) { card = { link: '#', name: '' } }
    return(
      <div className={`popup popup_type_full-img-place ${isOpen ? 'to-visible' : ''}`}>
        <div className="popup__container popup__container_type_figure">
          <figure className="popup__figure">
            <img src={ card.link } alt={`Изображение ${card.name}`} className="popup__img" />
            <figcaption className="popup__figcaption"> {card.name} </figcaption>
          </figure>
          <button 
            className="popup__btn-close button-zeroing transition-opacity" 
            type="button" 
            name="Закрыть окно c изображением"
            onClick={onClose}
          />
        </div>
      </div>
    )
}