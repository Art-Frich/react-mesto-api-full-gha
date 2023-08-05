import failedIcon from "../../images/icon-failed-auth.svg";
import successfullIcon from "../../images/icon-successful-auth.svg";

export default function InfoTooltip({
  isOpen, isError, onClose, text
}){
  return(
    <div 
      className={`popup ${isOpen ? 'to-visible' : ''}`}
    >
      <div 
        className="popup__container popup_container_type_info-msg"
      >
        <img className="popup__info-icon" src={ isError ? failedIcon : successfullIcon } alt="Иконка статуса события"/>
        <h2 className="popup__title">{ text }</h2>
        <button 
          className="popup__btn-close button-zeroing transition-opacity" 
          type="button" 
          name="close-btn-info-msg"
          onClick={ onClose }
        />  
      </div>
    </div>
  )
}