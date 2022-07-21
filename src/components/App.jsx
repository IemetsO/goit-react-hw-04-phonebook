import React from 'react';
import ContactList from './ContactList/ContactList';
import Form from './Form/form';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount(){
    const contacts = localStorage.getItem("contacts")
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts){
    this.setState({contacts: parsedContacts})}
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts){
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }

  }

  addContact = data => {
    const names = this.state.contacts.map(contact => contact.name.toLowerCase())
 
      if (names.includes(data.name.toLowerCase())) {
        alert(`${data.name} is already in the list`);
      } else {
        const contact = {
          id: nanoid(),
          name: data.name,
          number: data.number,
        };
        this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }))
        return;
      }
    ;
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
     
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact}></Form>
        <h2>Contacts</h2>

        <Filter value={this.state.filter} onChange={this.changeFilter}></Filter>
        <ContactList
          data={visibleContacts}
          onDeleteContact={this.deleteContact}
        ></ContactList>
      </div>
    );
  }
}

export default App;
