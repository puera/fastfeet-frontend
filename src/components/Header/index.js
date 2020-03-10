import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/img/fastfeet-logo.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Menu, Profile, LinkMenu } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Menu>
          <LinkMenu to="/deliveries">
            <img src={logo} alt="FastFeet" />
          </LinkMenu>
          <nav>
            <LinkMenu to="/deliveries">ENCOMENDAS</LinkMenu>
            <LinkMenu to="/deliverymans">ENTREGADORES</LinkMenu>
            <LinkMenu to="/recipients">DESTINATÁRIOS</LinkMenu>
            <LinkMenu to="/problems">PROBLEMAS</LinkMenu>
          </nav>
        </Menu>
        <aside>
          <Profile>
            <strong>{profile.name}</strong>

            <button type="button" onClick={handleSignOut}>
              Sair do Sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
