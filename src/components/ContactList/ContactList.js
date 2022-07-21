import React from 'react';
import Contact from 'components/Contact/Contact';
import PropTypes from 'prop-types';
import s from "./ContactList.module.css";

const ContactList = ({ data, onDeleteContact }) => {
  return (
    <section>
      <ul>
        {data.map(e => (
          <Contact
            key={e.id}
            name={e.name}
            number={e.number}
            onDeleteContact={onDeleteContact}
          >
            <button className={s.button} onClick={() => onDeleteContact(e.id)}> Delete </button>
          </Contact>
        ))}
      </ul>
    </section>
  );
};

export default ContactList;

ContactList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  })).isRequired,
  onDeleteContact: PropTypes.func.isRequired
}
