import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMoreHoriz } from 'react-icons/md';
import ClickOut from 'react-outside-click-handler';
import PropTypes from 'prop-types';

import { Container, ActionButton, ActionList, Action } from './styles';

export default function ActionMenu({ actions }) {
  const [isOpened, setIsOpened] = useState(false);

  function handleMenu() {
    setIsOpened(!isOpened);
  }

  function handleOutSideClick() {
    setIsOpened(false);
  }

  function renderActionListMenu() {
    return (
      <ActionList visible={isOpened}>
        {actions.map((action, index) => (
          <Action key={`${action.link}_${String(index)}`}>
            <Link to={action.link}>
              {action.icon}
              {action.title}
            </Link>
          </Action>
        ))}
      </ActionList>
    );
  }

  return (
    <ClickOut onOutsideClick={handleOutSideClick}>
      <Container>
        <ActionButton onClick={handleMenu}>
          <MdMoreHoriz color="#B9B5B5" size={26} />
        </ActionButton>

        {renderActionListMenu()}
      </Container>
    </ClickOut>
  );
}

ActionMenu.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};
