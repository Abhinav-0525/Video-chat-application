import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import { useMediaQuery, useTheme } from '@mui/material';




function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const joinMeeting = async () => {
    if (meetingId.trim()) {
      await getMeetingAndToken(meetingId);
    }
  };

  const createMeeting = async () => {
    await getMeetingAndToken(null);
  };

  return (
    <div>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '20vh',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
          fontWeight: 400,
          color: '#202124',
          letterSpacing: '0.7px',
          lineHeight: 1.4,
        }}
      >
        Video Chat Application
      </Typography>
    </Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        mt: 8,
      }}
    >
      {/* <Typography variant="h5" sx={{ fontWeight: 500, color: '#202124' }}>
        Join or Create  Meeting
      </Typography> */}

      

      <Box sx={{ display: 'flex', alignItems: 'flex-end',justifyContent:'center', width: '100%', maxWidth: 360 }}>
        <LinkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id="meeting-id-input"
          label="Enter Meeting ID"
          variant="standard"
          value={meetingId}
          onChange={(e) => setMeetingId(e.target.value)}
          sx={{
            width: { xs: '80%', sm: '100%' }, // 80% on mobile, 100% on larger screens
            '& .MuiInputBase-root': {
              fontSize: { xs: '0.875rem', sm: '1rem' }, // Smaller font on mobile
            },
            '& .MuiInputLabel-root': {
              fontSize: { xs: '0.875rem', sm: '1rem' }, // Smaller label on mobile
            }
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={joinMeeting}>
          Join
        </Button>
        <Button variant="outlined" onClick={createMeeting}>
          Create
        </Button>
      </Box>
    </Box>
    </div>
  );
}

export default JoinScreen;