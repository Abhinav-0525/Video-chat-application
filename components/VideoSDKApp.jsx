'use client';

import { useState, useEffect } from 'react';
import { MeetingProvider } from '@videosdk.live/react-sdk';
import MeetingView from './MeetingView';
import JoinScreen from './JoinScreen';
import { createOrJoinMeeting } from '../lib/utils';

export default function VideoSDKApp() {
  const [meetingId, setMeetingId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');  // NEW: store participant name

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_VIDEOSDK_AUTH_TOKEN;
    if (token) setAuthToken(token);
    else setError('VideoSDK auth token not found in environment variables');
  }, []);

  const getMeetingAndToken = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const finalMeetingId = await createOrJoinMeeting(id, authToken);
      setMeetingId(finalMeetingId);
    } catch (err) {
      console.error('Meeting error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
    setName(''); // reset name on leave
  };

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  return authToken && meetingId ? (
    
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name:name, 
      }}
      token={authToken}
    >
      
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} setName={setName} name={name} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}
