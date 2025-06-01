'use client';

import React, { useState, useEffect } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

export default function Controls() {
  const { leave, toggleMic, toggleWebcam, localParticipant } = useMeeting();
  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);

  useEffect(() => {
    if (localParticipant) {
      setMicOn(localParticipant.micOn);
      setWebcamOn(localParticipant.webcamOn);
    }
  }, [localParticipant]);

  const handleToggleMic = () => {
    toggleMic();
    setMicOn((prev) => !prev);
  };

  const handleToggleWebcam = () => {
    toggleWebcam();
    setWebcamOn((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      mt={2}
    >
      <Tooltip title={!micOn ?  'Mute':'Unmute'}>
        <IconButton
          onClick={handleToggleMic}
          sx={{
            bgcolor: !micOn ? 'white' : 'red',
            color: !micOn ? 'black' : 'white',
          }}
        >
          {!micOn ?  <MicIcon />:<MicOffIcon /> }
        </IconButton>
      </Tooltip>

      <Tooltip title={webcamOn ? 'Turn on camera' : 'Turn off camera'}>
        <IconButton
          onClick={handleToggleWebcam}
          sx={{
            bgcolor: webcamOn ? 'red' : 'white',
            color: webcamOn ? 'white' : 'black',
          }}
        >
          {webcamOn ?  <VideocamOffIcon />:<VideocamIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Leave call">
        <IconButton onClick={leave} sx={{ bgcolor: 'red', color: 'white' }}>
          <CallEndIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
