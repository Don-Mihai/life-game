import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SplitButton from 'components/DropDownButton';
import './MenuButton.scss';

export default function BasicMenu({ setBuilderEnabled }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogOut = () => {
    localStorage.removeItem('GAME_USER_ID');
    window.location.href = '/';
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Меню
      </Button>

      <Menu
        className="menu"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          onClick={() => {
            setBuilderEnabled(true);
            handleClose();
          }}
        >
          Построить График
        </MenuItem>
        <MenuItem onClick={onClickLogOut}>Выйти</MenuItem>
        <MenuItem>
          <SplitButton />
        </MenuItem>
      </Menu>
    </div>
  );
}
