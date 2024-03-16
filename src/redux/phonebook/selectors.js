export const getContacts = state => state.contacts.items;

export const getIsLoading = state => state.contacts.isLoading;

export const getError = state => state.contacts.error;

export const getStatusFilter = state => state.filter;

// import { createSelector } from '@reduxjs/toolkit';

// export const getFilteredContacts = createSelector(
//   [getContacts, getStatusFilter],
//   (contacts, filter) => {
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   }
// );
