import React from 'react';
import PropTypes from "prop-types";

const Message = ({children}) => {
  Message.propTypes = {
    children: PropTypes.element
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default Message;
