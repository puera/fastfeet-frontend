import styled from 'styled-components';
import { lighten } from 'polished';

export const Status = styled.div`
  background: ${props => lighten(0.3, props.color)};
  width: 150px;
  border-radius: 25px;
  span {
    display: flex;
    align-items: center;
    color: ${props => props.color};
    padding: 3px 10px;
    font-weight: bold;
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      background: ${props => props.color};
      border-radius: 50%;
      margin-right: 6px;
    }
  }
`;
