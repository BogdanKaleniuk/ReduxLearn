import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FormBook, Input, Label, Btn, Error } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

let schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Please, enter name'),
  number: yup
    .string()
    .min(6)
    .max(16)
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Please, enter correct number'),
});

const initialValues = {
  name: '',
  number: '',
};

export default function FormEl() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const findDuplicateName = (contacts, newName) => {
      return contacts.find(({ name }) => name === newName);
    };
    const { name } = values;
    if (findDuplicateName(contacts.items, name.toLowerCase())) {
      alert(`${name} is already in your contacts`);
      return;
    }
    dispatch(addContact(values));
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormBook autoComplete="off">
        <Label>
          Name
          <Input
            type="text"
            placeholder="Enter name"
            name="name"
            title="Name may contain only letters"
          />
          <Error name="name" component="div" />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            placeholder="+380"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <Error name="number" component="div" />
        </Label>

        <Btn type="submit">Add contact</Btn>
      </FormBook>
    </Formik>
  );
}

FormEl.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
