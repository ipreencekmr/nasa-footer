import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { LinkType } from '../enums/enums';

const iconItem = (type) => {
  switch (type) {
    case LinkType.EMAIL:
      return <EmailIcon />;
    case LinkType.LINKED_IN:
      return <LinkedInIcon />;
    case LinkType.FACEBOOK:
      return <FacebookIcon />;
    default:
      return <EmailIcon />;
  }
};

const itemText = (type) => {
  switch (type) {
    case LinkType.EMAIL:
      return 'Email';
    case LinkType.LINKED_IN:
      return 'Linked In';
    case LinkType.FACEBOOK:
      return 'Facebook';
    default:
      return 'Email';
  }
};

export const ContactItem = ({ url, type }) => {
  const icon = iconItem(type);
  const itemTxt = itemText(type);

  return (
    <ListItemButton
      component="a"
      href={url}
      target={type === LinkType.EMAIL ? '' : '__blank'}
    >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={itemTxt} />
    </ListItemButton>
  );
};

ContactItem.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
};
