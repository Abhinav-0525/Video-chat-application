'use client';

import React, { useEffect, useRef } from 'react';
import { useParticipant } from '@videosdk.live/react-sdk';
import {
  Box,
  Typography,
  Avatar,
  Badge,
} from '@mui/material';

export default function ParticipantView({ participantId }) {
  const micRef = useRef(null);
  const videoRef = useRef(null);
  const {
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal,
    displayName,
  } = useParticipant(participantId);

  useEffect(() => {
    if (videoRef.current) {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        videoRef.current.srcObject = mediaStream;
        videoRef.current
          .play()
          .catch((error) =>
            console.error('Video play failed', error)
          );
      } else {
        videoRef.current.srcObject = null;
      }
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error('Audio play failed', error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <Box
      sx={{
        padding: 2,
        border: '1px solid #ccc',
        margin: 2,
        borderRadius: 2,
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6">
        {displayName || 'Unknown'}
        {isLocal && (
          <Typography 
            component="span" 
            sx={{ 
              fontSize: '0.8rem', 
              color: 'primary.main',
              ml: 1 
            }}
          >
            (You)
          </Typography>
        )}
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: {xs: 200, sm: 200, md: 300},
          height: {xs: 200, sm: 200, md: 300},
          backgroundColor: '#000',
          margin: '0 auto',
        }}
      >
        {webcamOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isLocal}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(error) => {
              console.error('Video element error:', error);
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            Camera Off
          </Box>
        )}
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      </Box>
    </Box>
  );
}