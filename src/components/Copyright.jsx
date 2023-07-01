import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const Copyright = () => (
  <Typography
    variant="body2"
    color="text.secondary"
  >
    {`©  ${new Date().getFullYear()} Copyright: `}
    <Link color="inherit" href="https://about.me/ipreencekmr">
      About Me
    </Link>{' '}
  </Typography>
);
