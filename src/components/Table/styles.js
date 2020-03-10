import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      > div {
        display: flex;
        align-items: center;
      }
      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        overflow: visible;
      }
      &:last-child {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        justify-content: center;
        overflow: visible;
      }
    }
  }
`;

export const Spinner = styled(FaSpinner).attrs({
  color: '#B9B5B5',
  size: 40,
})`
  animation: ${rotate} 2s linear infinite;
  align-self: center;
  margin-top: 50px;
`;

export const Pagination = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      background: 0;
      padding: 5px;
      border: none;
      border-radius: 50%;
      transition: background 0.2s;
      width: 50px;
      height: 50px;
      &:hover {
        background: #ddd;
      }
    }
  }
  span {
    display: flex;
    font-weight: bold;
  }
`;
