import PropTypes from 'prop-types';
import React from 'react';


const Contact = ({ name, number, children }) => {
  return (
    <li>
      {name} : {number}
      {children}
    </li>
  );
};

export default Contact;

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
