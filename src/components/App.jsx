import React from 'react';
import ContactList from './ContactList/ContactList';
import Form from './Form/form';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { useState, useEffect} from "react"

const useLocalStorage = (key,defaultValue) => {
  const [state, setState] = useState(() => 
    JSON.parse(window.localStorage.getItem(key)) ?? defaultValue)

    useEffect(()=>{
      window.localStorage.setItem(key, JSON.stringify(state))
    }, [state, key])
    return [state, setState]
}

export default function App(){
const [contacts, setContacts] = useLocalStorage("contacts", [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]);
const [filter, setFilter] = useState("");

const addContact = data => { 
  const names = contacts.map(contact => contact.name.toLowerCase())

      if (names.includes(data.name.toLowerCase())) {
        alert(`${data.name} is already in the list`);
      } else {
        const contact = {
          id: nanoid(),
          name: data.name,
          number: data.number,
        };
        setContacts(prevState => [ contact, ...prevState])
        return;
      }
}

const deleteContact = contactId => {
  setContacts(prevState => 
   prevState.filter(contact => contact.id !== contactId),
  )
}

const changeFilter = e => {
  setFilter( e.currentTarget.value );
};

const getVisibleContacts = () => {
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

const visibleContacts = getVisibleContacts()

return (
  <div>
    <h1>Phonebook</h1>
    <Form onSubmit={addContact}></Form>
    <h2>Contacts</h2>

    <Filter value={filter} onChange={changeFilter}></Filter>
    <ContactList
      data={visibleContacts}
      onDeleteContact={deleteContact}
    ></ContactList>
  </div>
);

}
