import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styles';

export default function Button({ onClick, icon, backgroundColor, children }) {
  return (
    <StyledButton
      type="button"
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {icon}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element,
  children: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

Button.defaultProps = {
  icon: null,
  backgroundColor: '#7d40e7',
};
