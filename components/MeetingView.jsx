'use client';

import React, { useState } from 'react';
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography,Grid, Card, CardContent, CardActions,IconButton, Tooltip} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useMeeting } from '@videosdk.live/react-sdk';
import ParticipantView from './ParticipantView';
import Controls from './Controls';

export default function MeetingView({ meetingId, onMeetingLeave, setName, name }) {
  const [joined, setJoined] = useState(null);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const { join, participants, localParticipant } = useMeeting({
    onMeetingJoined: () => {
      console.log('Meeting joined successfully');
      setJoined('JOINED');
    },
    onMeetingLeft: onMeetingLeave,
    onError: (error) => {
      console.error('Meeting error:', error);
      setJoined('ERROR');
    },
  });

  const handleJoinMeeting = () => {
    if (name.trim() === '') {
      setOpenNameDialog(true);
    } else {
      setJoined('JOINING');
      join();
    }
  };

  const handleNameSubmit = () => {
    if (name.trim() !== '') {
      setOpenNameDialog(false);
      setJoined('JOINING');
      join();
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(meetingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ padding: 4, textAlign: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        <Typography sx={{fontSize: { xs: '1.2rem', sm: '1.2rem', md: '1.5rem' }}} variant="h5" gutterBottom>
          Meeting ID: {meetingId}
        </Typography>
        <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
          <IconButton onClick={handleCopy}  size="small">
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      {joined === 'JOINED' ? (
        <>
          
          {/* <Box sx={{ marginTop: 4 }}>
            {localParticipant && (
              <Box>
                <Typography variant="h6">You:</Typography>
                <ParticipantView participantId={localParticipant.id} />
              </Box>
            )}
            {[...participants.keys()]
              .filter((id) => id !== localParticipant?.id)
              .map((id) => (
                <ParticipantView key={id} participantId={id} />
              ))}
          </Box> */}
          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            {[...participants.keys()].map((id) => (
              <Grid key={id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ParticipantView participantId={id} />
              </Grid>
            ))}
          </Grid>
          <Controls />
        </>
      ) : joined === 'JOINING' ? (
        <Typography sx={{fontSize: { xs: '1.1rem', sm: '1.1rem', md: '1.3rem' }}}>Joining meeting...</Typography>
      ) : joined === 'ERROR' ? (
        <>
          <Typography color="error">Error joining. Try again.</Typography>
          <Button variant="contained" onClick={handleJoinMeeting}>
            Retry
          </Button>
        </>
      ) : (
        
        <Card sx={{ maxWidth: 300, margin: '50px auto' }}>
          <CardContent> 
            <Typography variant="h5" component="div">
              Are you ready?
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant="contained" sx={{mb:3}} onClick={handleJoinMeeting}>
              Join Meeting
            </Button>
          </CardActions>
        </Card>
      )}

      <Dialog open={openNameDialog} onClose={() => setOpenNameDialog(false)}>
        <DialogTitle>Enter Your Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)} // use setter from parent
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNameDialog(false)}>Cancel</Button>
          <Button onClick={handleNameSubmit}>Join</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

