import React from 'react';

import logo from '~/assets/img/fastfeet-logo.png';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="FastFeet" />
      <form>
        <strong>SEU EMAIL</strong>
        <input type="email" placeholder="exemplo@email.com" />
        <strong>SUA SENHA</strong>
        <input type="password" placeholder="************" />

        <button type="button">Entrar no sistema</button>
      </form>
    </>
  );
}
