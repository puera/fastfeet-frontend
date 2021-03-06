import React from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import Button from '~/components/Global/Button';

import { Container, Header, FormContent } from './styles';

export default function Form({
  title,
  children,
  saveButtonHandler,
  goBackButtonHandler,
}) {
  return (
    <Container>
      <Header>
        <h1>{title}</h1>
        <div>
          <Button
            icon={<MdChevronLeft color="#fff" size={20} />}
            backgroundColor="#CCC"
            onClick={goBackButtonHandler}
          >
            VOLTAR
          </Button>
          <Button
            icon={<MdCheck color="#fff" size={20} />}
            onClick={saveButtonHandler}
          >
            SALVAR
          </Button>
        </div>
      </Header>
      <FormContent>{children}</FormContent>
    </Container>
  );
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  saveButtonHandler: PropTypes.func.isRequired,
  goBackButtonHandler: PropTypes.func.isRequired,
};
