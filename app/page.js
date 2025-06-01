"use client";
import React from "react";
import dynamic from "next/dynamic";
import {logo} from "../public/logo3.jpg"; 
import { AppBar, Toolbar, Avatar, Container, Typography, Box,Backdrop, CircularProgress } from '@mui/material';

// Dynamically import the VideoSDK component with SSR disabled
const VideoSDKApp = dynamic(() => import("../components/VideoSDKApp"), {
  ssr: false,
  loading: () => (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ),
});

export default function Page() {
  return (
    <div style={{margin: "0", padding: "0"}}>
      <AppBar position="static">
      <Container maxWidth="">
        <Toolbar disableGutters>
          <Avatar
          src="/logo3.jpg"
          alt="Logo"
          sx={{ 
            width: 45, 
            height: 45, 
            mr: 2, // Add margin for spacing
          }}
        />
          <Typography
            variant="h6"
            noWrap
            component="p"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ChitChat
          </Typography>
        </Toolbar>
      </Container>
      </AppBar>
      
      <VideoSDKApp />
    </div>
  );
}