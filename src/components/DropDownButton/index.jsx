import * as React from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import { MenuList, MenuItem, Popper, Paper, Grow, ClickAwayListener, ButtonGroup, Button } from '@mui/material';
import './DropDownButton.scss';
import { useSelector } from 'react-redux';
import { exportToExcel, exportToPDF, exportToTXT } from './utils';

const options = ['Экспортировать в Таблице', 'Экспортировать в PDF', 'Экспортировать в TXT'];

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { skills } = useSelector((state) => state.skill);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    handleExport(index);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleExport = (index) => {
    if (index === 0) {
      exportToExcel(skills);
    } else if (index === 1) {
      exportToPDF(skills);
    } else if (index === 2) {
      exportToTXT(skills);
    }
  };

  return (
    <>
      <ButtonGroup className="drop-down-component" variant="contained" ref={anchorRef} aria-label="Button group with a nested menu">
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <IosShareIcon />
        </Button>
      </ButtonGroup>
      <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
