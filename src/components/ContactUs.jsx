import React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { LinkType } from '../enums/enums';
import { ContactItem } from './ContactItem';

export const ContactUs = () => {
  const urls = React.useRef([
    {
      type: LinkType.EMAIL,
      value: 'mailto:ipreencekmr@gmail.com',
    },
    {
      type: LinkType.LINKED_IN,
      value: 'https://www.linkedin.com/in/ipreencekmr/',
    },
    {
      type: LinkType.FACEBOOK,
      value: 'https://www.facebook.com/profile.php?id=100083273206168',
    },
  ]);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={(
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            fontSize: '12px',
            textTransform: 'uppercase',
            backgroundColor: 'transparent',
          }}
        >
          Contact Us
        </ListSubheader>
                      )}
    >
      {
        urls.current.map((item) => (
          <ContactItem
            key={item.type}
            url={item.value}
            type={item.type}
          />
        ))
      }
    </List>
  );
};
