import styled, { keyframes, css } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import { darken } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Button = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  height: 44px;
  width: 300px;
  margin-top: 20px;
  align-self: center;
  background: #7159c1;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover {
    background: ${darken(0.1, '#7159c1')};
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
export const Spinner = styled(FaSpinner).attrs({
  color: '#fff',
  size: 20,
})``;
