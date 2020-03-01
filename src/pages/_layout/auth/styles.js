import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #7159c1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  min-height: 394px;
  max-width: 350px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding-bottom: 27px;

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
      padding: 15px 28px;
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
  }
`;
