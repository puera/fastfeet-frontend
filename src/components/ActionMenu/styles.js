import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const ActionButton = styled.button`
  display: flex;
  border: 0;
  background: none;
`;

export const ActionList = styled.div`
  z-index: 1;
  position: absolute;
  width: 160px;
  left: calc(50% - 80px);
  top: calc(100% + 10px);
  background: #fff;
  border-radius: 4px;
  filter: drop-shadow(rgba(0, 0, 0, 0.3) 0 10px 20px);
  padding: 15px 15px;
  display: ${props => (props.visible ? 'block' : 'none')};
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
  }
`;

export const Action = styled.div`
  & + div {
    border-top: 2px solid #eee;
  }
  a {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 16px;
    margin: 6px 0;
    font-weight: bold;

    &:hover {
      color: #333;
    }

    svg {
      margin: auto 7px;
    }
  }
`;
