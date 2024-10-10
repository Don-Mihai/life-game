import Link from '@mui/material/Link';

const SubLink = ({ text, linkText, onClick }) => {
  return (
    <h3 className="auth__subtitle">
      {text}{' '}
      <span onClick={onClick}>
        <Link sx={{ cursor: 'pointer' }} underline="hover">
          {linkText}
        </Link>
      </span>
    </h3>
  );
};

export default SubLink;
