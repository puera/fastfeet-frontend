import styled from 'styled-components';
import { lighten } from 'polished';

export const Status = styled.div`
  span {
    background: ${props => lighten(0.3, props.color)};
    border-radius: 25px;
    display: flex;
    align-items: center;
    color: ${props => props.color};
    padding: 5px 0 5px 10px;
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

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;
