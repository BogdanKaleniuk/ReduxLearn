import PropTypes from 'prop-types';
import { Div, ContactTitle, ContactWrapper } from './ContactList.styled';
import Item from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

export default function ContactList({ Message }) {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const normFilter = filter.value.toLowerCase();

  const filteredContacts = contacts.items.filter(({ name }) =>
    name?.toLowerCase()?.includes(normFilter)
  );
  return (
    <Div>
      <ContactTitle>{Message}</ContactTitle>
      <ContactWrapper>
        {filteredContacts.map(({ id, name, number }) => (
          <Item key={id} id={id} name={name} number={number} />
        ))}
      </ContactWrapper>
    </Div>
  );
}

ContactList.propTypes = {
  title: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
