import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import styles from './ContactForm.module.css';

function ContactForm({ onSubmit }) {
  let contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();
    let name = e.target[0].value;
    let number = e.target[1].value;

    if (contacts.some(contact => contact.name === name)) {
      alert(name + ' is already in contacts.');
      return;
    }
    if (contacts.some(contact => contact.number === number)) {
      alert(number + ' is already associated with a contact.');
      return;
    }

    let newContact = {
      name: name,
      number: number,
    };

    onSubmit(newContact);
    document.getElementsByTagName('form')[0].reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        className={styles.input}
        type="text"
        name="name"
        id="name"
        pattern="^[a-zA-Z]+(([' -][a-zA-Z])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        autoComplete="off"
      />
      <label htmlFor="number">Number</label>
      <input
        className={styles.input}
        type="tel"
        name="number"
        id="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        autoComplete="off"
      />
      <button type="submit" className={styles.button}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
