import logo from "../images/logo.svg";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

export default function Header({ email, onSignOut }){
  return(
    <header className="header">
      <img src={logo} alt="Логотип Mesto Russia" className="header__logo" />
      <div className="header__nav">
        <Routes>
          <Route path="/sign-in" element={ 
            <Link className='header__link' to='/sign-up'>Зарегистрироваться</Link> 
          }/>
          <Route path="/sign-up" element={
            <Link className='header__link' to='/sign-in'>Войти</Link>
          }/>
          <Route path="/" element={
            <>
              {email}
              <Link className="header__link" to='/sign-in' onClick={ onSignOut }>Выйти</Link>
            </>
          }/>
        </Routes>
      </div>
    </header>
  )
}