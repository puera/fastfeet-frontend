import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7159c1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-height: 450px;
  max-width: 350px;
  text-align: center;
  background: #fff;
  border-radius: 4px;

  img {
    margin-top: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    align-items: center;

    strong {
      align-self: flex-start;
      padding: 15px 15px;
      font-size: 16px;
    }

    span {
      color: #fb6f91;
      align-self: center;
      margin: 10px 0 10px;
      font-weight: bold;
    }

    input {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 44px;
      width: 300px;
      padding: 0 15px;
    }

    button {
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

      &:hover {
        background: ${darken(0.1, '#7159c1')};
      }
    }
  }
`;
