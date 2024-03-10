import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getError,
  getContacts,
  getIsLoading,
  getStatusFilter,
} from '../../redux/selectors';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../../redux/operations';

import styles from './App.module.css';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';

import { setFilter } from '../../redux/filterSlice';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const contacts = useSelector(getContacts);
  const filter = useSelector(getStatusFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmit = newContact => {
    dispatch(addContact(newContact));
  };

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  const handleClick = e => {
    dispatch(deleteContact(e.target.id));
  };

  return (
    <div className={styles.phonebook}>
      {isLoading && <b>Loading tasks...</b>}
      {error && <b>{error}</b>}

      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filterValue={filter} filterFunction={handleFilterChange} />
      <ContactList
        listToSearch={filteredContacts}
        deleteFunction={handleClick}
      />
    </div>
  );
};

export default App;
