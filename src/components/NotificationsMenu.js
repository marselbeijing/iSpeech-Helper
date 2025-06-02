import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  Button,
  useTheme
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationsNone as NotificationsNoneIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { getCurrentUser } from '../services/telegram';
import {
  getUserNotifications,
  markNotificationAsRead,
  requestNotificationPermission
} from '../services/notifications';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

const NotificationsMenu = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      loadNotifications();
      requestNotificationPermission();
    }
  }, []);

  const loadNotifications = async () => {
    try {
      const user = getCurrentUser();
      if (user) {
        const userNotifications = await getUserNotifications(user.id);
        setNotifications(userNotifications);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{ ml: 2 }}
      >
        <Badge badgeContent={unreadCount} color="error">
          {unreadCount > 0 ? <NotificationsIcon /> : <NotificationsNoneIcon />}
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
            overflow: 'auto'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('notifications')}
          </Typography>
        </Box>

        <Divider />

        {loading ? (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              {t('loading')}...
            </Typography>
          </MenuItem>
        ) : notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              {t('no_notifications')}
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              sx={{
                py: 1.5,
                px: 2,
                borderLeft: 4,
                borderLeftColor: notification.isRead
                  ? 'transparent'
                  : 'primary.main',
                bgcolor: notification.isRead
                  ? 'transparent'
                  : theme.palette.action.hover
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 0.5
                }}>
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    {notification.data.title}
                  </Typography>
                  {!notification.isRead && (
                    <IconButton
                      size="small"
                      onClick={() => handleMarkAsRead(notification.id)}
                      sx={{ ml: 1 }}
                    >
                      <CheckIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {notification.data.message}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 0.5 }}
                >
                  {formatDistanceToNow(notification.createdAt, {
                    addSuffix: true,
                    locale: ru
                  })}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}

        {notifications.length > 0 && (
          <>
            <Divider />
            <Box sx={{ p: 1 }}>
              <Button
                fullWidth
                size="small"
                onClick={handleClose}
              >
                {t('close')}
              </Button>
            </Box>
          </>
        )}
      </Menu>
    </>
  );
};

export default NotificationsMenu; 