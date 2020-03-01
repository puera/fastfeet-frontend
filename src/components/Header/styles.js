import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 30px;
    width: 200px;
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #eee;
  }

  nav {
    display: flex;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;

  strong {
    padding-bottom: 10px;
    color: #333;
  }

  button {
    margin-top: 5px;
    border: 0;
    background: none;
    color: red;
  }
`;

export const LinkMenu = styled(NavLink).attrs({
  activeStyle: { color: '#333' },
})`
  padding-right: 20px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.4);
  transition: color 0.5s;

  &:hover {
    color: #333;
  }
`;
