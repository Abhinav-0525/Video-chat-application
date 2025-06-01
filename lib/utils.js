export async function createOrJoinMeeting(id, authToken) {
  if (!id) {
    const response = await fetch('https://api.videosdk.live/v2/rooms', {
      method: 'POST',
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to create meeting: ${response.statusText}`);
    }

    const data = await response.json();
    return data.roomId;
  }

  return id;
}