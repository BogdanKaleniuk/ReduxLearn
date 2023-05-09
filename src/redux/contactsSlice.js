import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const anyFulfielledReducer = state => {
  state.isLoading = false;
  state.error = null;
};

const anyPendingReducer = state => {
  state.isLoading = true;
};
const anyRejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.fulfilled](state, action) {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [addContact.fulfilled](state, action) {
      state.items.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    [deleteContact.fulfilled](state, action) {
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );

      state.items.splice(index, 1);
      state.isLoading = false;
      state.error = null;
    },

    [fetchContacts.rejected]: anyRejectedReducer,
    [addContact.rejected]: anyRejectedReducer,
    [deleteContact.rejected]: anyRejectedReducer,

    [fetchContacts.pending]: anyFulfielledReducer,
    [addContact.pending]: anyPendingReducer,
    [deleteContact.pending]: anyRejectedReducer,
  },
});

export const contactsReducer = contactsSlice.reducer;

// import { createSlice, nanoid } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';

// import { persistReducer } from 'redux-persist';

// const contactsInitialState = {
//   contactList: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' }],
// };

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: contactsInitialState,
//   reducers: {
//     addContact(state, action) {
//       state.contactList.push({ ...action.payload, id: nanoid() });
//     },

//     deleteContacts(state, action) {
//       const index = state.contactList.findIndex(
//         contact => contact.id === action.payload
//       );
//       state.contactList.splice(index, 1);
//     },
//   },
// });

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// export const contactsReducer = persistReducer(
//   persistConfig,
//   contactsSlice.reducer
// );

// export const { contactList, addContact, deleteContacts } =
//   contactsSlice.actions;
// // export const contactsReducer = contactsSlice.reducer;
