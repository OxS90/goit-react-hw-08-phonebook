import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoading,
  getError,
  getContacts,
  getStatusFilter,
} from '../../redux/phonebook/selectors';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../../redux/phonebook/operations';
import ContactForm from '../../components/ContactForm/ContactForm';
import Filter from '../../components/Filter/Filter';
import ContactList from '../../components/ContactList/ContactList';
import { setFilter } from '../../redux/phonebook/filterSlice';
import styles from '../Phonebook/Phonebook.module.css';

export default function Phonebook() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const error = useSelector(getError);
  const contacts = useSelector(getContacts);
  const filter = useSelector(getStatusFilter);

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
      {isLoading && <b>Loading contacts...</b>}
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
}
