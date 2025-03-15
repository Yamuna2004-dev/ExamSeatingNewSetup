import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Button, Divider, IconButton, Stack, Toolbar, Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useNotifications } from '@toolpad/core/useNotifications';

import { title } from '@/config';
import { useSidebar } from '@/sections/Sidebar/hooks';
import { useThemeMode } from '@/theme';

import { getRandomJoke } from './utils';

function Header() {
  const navigate = useNavigate();
  const { themeMode, toggle: toggleThemeMode } = useThemeMode();
  const { open: openSidebar } = useSidebar();
  const notifications = useNotifications();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const HandleLogout = () => {
    navigate('/signin');
  };

  function showNotification() {
    notifications.show(getRandomJoke(), {
      autoHideDuration: 5000,
    });
  }

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={2}
      data-pw={`theme-${themeMode}`}
      enableColorOnDark
    >
      <Toolbar>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flex={1}>
          <Stack direction="row" gap={1} alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="info"
              aria-label="menu"
              onClick={openSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Button onClick={showNotification} color="info">
              {title}
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Switch theme" arrow>
              <IconButton
                color="info"
                edge="end"
                size="large"
                onClick={toggleThemeMode}
                data-pw="theme-toggle"
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Profile">
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <PersonIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={HandleLogout}>Logout</MenuItem>
                </Menu>
              </>
            </Tooltip>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
