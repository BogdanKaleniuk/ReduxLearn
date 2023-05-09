import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Message from './Message/Message';
import FormEl from './Form/Form';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/operations';

import { useDispatch, useSelector } from 'react-redux';
import { getError, getIsLoading } from '../redux/selectors';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      <Message Message="Phonebook" />
      <FormEl />
      <Filter Message="Find contacts by name" />
      {isLoading && !error && <b>Request in progress...</b>}

      <ContactList Message="Contacts" />
    </div>
  );
}
