import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';

import Button from '~/components/Global/Button';

import { Container, Content, Spinner, Pagination } from './styles';

export default function Table({
  colunn,
  data,
  title,
  inputPlaceholder,
  inputHandleChange,
  registerButtonHandler,
  loading,
  currentPage,
  totalPages,
  setPage,
}) {
  const formRef = useRef();

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

  function paginationHandler(val) {
    if (val > 0 && val <= totalPages) {
      setPage(val);
    }
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
        {registerButtonHandler && (
          <Button
            icon={<MdAdd color="#fff" size={20} />}
            onClick={registerButtonHandler}
          >
            CADASTRAR
          </Button>
        )}
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
      <Pagination>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Form ref={formRef}>
          <button
            type="button"
            onClick={() => paginationHandler(currentPage - 1)}
          >
            <MdChevronLeft color="#333" size={35} />
          </button>
          <button
            type="button"
            onClick={() => paginationHandler(currentPage + 1)}
          >
            <MdChevronRight color="#333" size={35} />
          </button>
        </Form>
      </Pagination>
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
  registerButtonHandler: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

Table.defaultProps = {
  registerButtonHandler: null,
};
