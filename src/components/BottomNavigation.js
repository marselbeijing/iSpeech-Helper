import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import FunctionsIcon from '@mui/icons-material/Apps';
import AccountIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';

const StyledBottomNavigation = styled(BottomNavigation)({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '56px',
  backgroundColor: '#fff',
  boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
});

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [value, setValue] = React.useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <StyledBottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
    >
      <BottomNavigationAction
  label="Home"
  value="/"
  icon={<HomeIcon />}
/>
<BottomNavigationAction
  label="Functions"
  value="/functions"
  icon={<FunctionsIcon />}
/>
<BottomNavigationAction
  label="Progress"
  value="/progress"
  icon={<ProgressIcon />}
/>
<BottomNavigationAction
  label="Account"
  value="/account"
  icon={<AccountIcon />}
      />
    </StyledBottomNavigation>
  );
}

export default NavigationBar; 