import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/img/fastfeet-logo.png';

import { Container, Content, Menu, Profile, LinkMenu } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <Menu>
          <LinkMenu to="/dashboard">
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
            <Link to="/profile">
              <strong>Admin FastFeet</strong>
            </Link>
            <button type="button">Sair do Sistema</button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
