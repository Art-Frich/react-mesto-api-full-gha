import PageWithForm from "./PageWithForm";
import { Link } from "react-router-dom";
import React from "react";

export default function Login({
  onSubmit, fetchCondition
}){
  function handleSubmit( e, email, password ){
    e.preventDefault();
    onSubmit( email, password );
  }
  
  return(
    <PageWithForm 
      textTitle="Вход" 
      textBtnSbt="Войти" 
      onSubmit={ handleSubmit }
      fetchCondition={ fetchCondition }
      name='login'>
      <p className="page-auth__label-btn">
        Ещё не зарегистрированы? <Link className="page-auth__label-btn-link transition-opacity" to='/sign-up'>Зарегистрироваться</Link>
      </p>
    </PageWithForm>
  )
}