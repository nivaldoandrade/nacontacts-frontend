import { fireEvent, screen } from '@testing-library/react';
import { customRender } from '../../../../utils/customRender';

import { ListContacts } from '.';

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children
}));

describe('Lists Contacts Component', () => {
  it('delete the contact when the delete button is clicked', () => {
    const onDeleteContact = jest.fn();
    const contact = [
      {
        id: '08ece3b4-dcdd-4fac-b1ab-9bc67099a7c6',
        name: 'John Doe 1',
        email: 'jonhdoe1@mail.com.br',
        telephone: '(11) 99999-9999',
        category: {
          id: '9c7d4e7e-ba3a-46ff-a42c-0dc580ee3531',
          name: 'linkedin'
        }
      }
    ];

    customRender(
      <ListContacts
        orderByName="ASC"
        filteredContacts={contact}
        onDeleteContact={onDeleteContact}
        onToggleOrderByName={() => {}}
      />
    );

    fireEvent.click(screen.getByAltText('Delete'));

    expect(onDeleteContact).toHaveBeenCalled();
  });
});
