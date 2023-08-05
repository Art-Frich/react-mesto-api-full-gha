import PageWithForm from "./PageWithForm";
import { Link } from "react-router-dom";
import React from "react";

export default function Register({
  onSubmit, fetchCondition
}){

  function handleSubmit( e, email, password ){
    e.preventDefault();
    onSubmit( email, password );
  }

  return(
    <PageWithForm 
      textTitle="Регистрация" 
      textBtnSbt="Зарегистрироваться" 
      onSubmit={ handleSubmit }
      fetchCondition={ fetchCondition }
      name='register'
    >
      <p className="page-auth__label-btn">
        Уже зарегистрированы? <Link className="page-auth__label-btn-link transition-opacity" to='/sign-in'>Войти</Link>
      </p>
    </PageWithForm>
  )
}