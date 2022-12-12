import React, { useState } from 'react'
import Library from './components/Library'
import MP3Player from './components/MP3Player'

import chillHop, { Track } from './tracks'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'


const Container = styled.div({
  display: 'flex',
  height: '100%'
})

function App() {
  // const tracks: Track[] = chillHop();
  const [tracks, setTracks] = useState<Track[]>(chillHop())

  const updateTracksStatus = (activeId: string) => {
    setTracks(tracks => tracks.map((track) => {
         return track.id === activeId ? {...track, active: true} : {...track, active: false} 
    }))
  }
  // // TODO: wrap into function getPrevAndNext
  // const next = tracks[(tracks.findIndex(t => t.id == currentTrack.id) + 1) % tracks.length] 
  // const prev = tracks[(tracks.findIndex(t => t.id == currentTrack.id) + tracks.length - 1) % tracks.length]
  // // change active status in array of tracks? 

  return (
    <Container>
      <Library tracks={tracks} updateTracksStatus={updateTracksStatus}/>
      <MP3Player tracks={tracks} updateTracksStatus={updateTracksStatus} />
    </Container>
  )
}

export default App
