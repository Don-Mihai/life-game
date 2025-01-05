import React from 'react';
import Link from '@mui/material/Link';

const SubLink = ({ text, linkText, onClick }) => {
  return (
    <h3 className="auth__subtitle">
      {text}{' '}
      <Link onClick={onClick} sx={{ cursor: 'pointer' }} underline="hover">
        {linkText}
      </Link>
    </h3>
  );
};

export default SubLink;
