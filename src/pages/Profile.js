import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';

export const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <Paper elevation={3} sx={{ padding: '1.5rem' }}>
        <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
          <strong>First Name:</strong> {profile.firstName}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
          <strong>Last Name:</strong> {profile.lastName}
        </Typography>
        <Typography variant="body1">
          <strong>Phone Number:</strong> {profile.phoneNumber}
        </Typography>
      </Paper>
    </Box>
  );
}
