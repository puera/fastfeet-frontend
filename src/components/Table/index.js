import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';

import { Container, Content, Spinner } from './styles';

export default function Table({
  colunn,
  data,
  title,
  inputPlaceholder,
  inputHandleChange,
  loading,
}) {
  function renderData() {
    return (
      <>
        <thead>
          <tr>
            {colunn.map(c => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`${item}_${String(index)}`}>
              {item.map((i, tdIndex) => (
                <td key={`${i}_${String(tdIndex)}`}>{i}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </>
    );
  }
  return (
    <Container>
      <h1>{title}</h1>
      <div>
        <input
          type="text"
          placeholder={inputPlaceholder}
          onKeyDown={inputHandleChange}
        />
        <button type="button">
          <MdAdd color="#fff" size={20} />
          CADASTRAR
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {data.length ? (
            <Content>{renderData()}</Content>
          ) : (
            <h1>Nenhum dado a ser mostrado</h1>
          )}
        </>
      )}
    </Container>
  );
}

Table.propTypes = {
  colunn: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    )
  ).isRequired,
  title: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  inputHandleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};