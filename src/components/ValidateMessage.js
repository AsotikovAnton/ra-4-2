import React from 'react';
import PropTypes from 'prop-types';

export default function ValidateMessage(props) {
  const { msg } = props;

  return (
    <div className="validate">
      <p>{msg}</p>
    </div>
  );
}

ValidateMessage.propTypes = {
  msg: PropTypes.string.isRequired,
};
