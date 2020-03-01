import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 20px auto;
  > h1 {
    font-size: 24px;
    font-weight: bold;
    color: #444;
    margin-top: 20px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    align-items: center;

    input {
      height: 28px;
      width: 200px;
      padding: 0 12px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    button {
      display: flex;
      align-items: center;
      background: #7d40e7;
      border-radius: 4px;
      border: none;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      padding: 7px 16px;

      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const Content = styled.table`
  border-spacing: 0 14px;
  margin: 10px 0;
  thead tr {
    color: #444;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    th {
      padding: 0 15px;
      &:first-child {
        padding-left: 25px;
      }
      &:last-child {
        width: 1%;
      }
    }
  }
  tbody {
    background: #fff;
    td {
      padding: 12px 15px;
      font-size: 16px;
      color: #666;
      border: none;

      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        display: flex;
        justify-content: center;
      }
    }
  }
`;
