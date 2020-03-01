import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';

import { Container, Content } from './styles';

export default function Table({ colunn, data, title, placeholder }) {
  function renderHeader() {
    return (
      <thead>
        <tr>
          {colunn.map(c => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
    );
  }

  function renderData() {
    return (
      <tbody>
        {data.map((item, index) => (
          <tr key={`${item}_${String(index)}`}>
            {item.map((i, tdIndex) => (
              <td key={`${i}_${String(tdIndex)}`}>{i}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
  return (
    <Container>
      <h1>{title}</h1>
      <div>
        <input type="text" placeholder={placeholder} />
        <button type="button">
          <MdAdd color="#fff" size={20} />
          CADASTRAR
        </button>
      </div>
      <Content>
        {renderHeader()}
        {renderData()}
      </Content>
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
  placeholder: PropTypes.string.isRequired,
};
