import React, { useState, useRef, useEffect } from 'react'
import { Track }  from '../tracks'
import PlayerControls from './PlayerControls'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes, css } from '@emotion/react'
import styled from '@emotion/styled'

interface IProps {
  tracks: Track[],
  updateTracksStatus: (activeId: string) => void
}

const Container = styled.div({
  display: 'flex',
  flex: 4,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const TrackCover = styled.img({
  width: 360,
  borderRadius: '25%'
})

const TrackName = styled.div({
  fontSize: 28,
  padding: 20,
  marginTop: 24,
  fontWeight: 600,
  color: '#363636'
})

const TrackArtist = styled.div({
  fontSize: 16,
  marginTop: 24,
  padding: 20,
  color: '#615E57'
})

const PSContainer = styled.div({
  display: 'flex',
  width: '70%',
  justifyContent: 'space-between',
  margin: 12
})

const ProgressScrubber = styled.input({
  width: '90%',
  height: 16
})

const Time = styled.div({
  fontSize: 14,
  width: 20
})

const bg = (colors: string[] ) => keyframes`
  0%, 100% { background-color: white }
  25% { background-color: ${colors[0]}  }
  50% { background-color: ${colors[1]}  }
`

const MP3Player: React.FC<IProps> = ({ tracks, updateTracksStatus }) => {

  const currentTrack = tracks.find(track => track.active)
  const currentTrackIndex = tracks.findIndex(track => track.active)

  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(new Audio(currentTrack?.audio))
  const timerRef = useRef<NodeJS.Timer>()

  const [duration, setDuration] = useState(audioRef.current.duration)

  const playPrevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
    updateTracksStatus(tracks[prevIndex].id)
  }

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length
    updateTracksStatus(tracks[nextIndex].id)
  }

  const startTimer = () => {
    clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        playNextTrack()
      } else {
        setProgress(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
      }
    }, 1000)
	}

  const onScrub = (value: string) => {
    clearInterval(timerRef.current)
    audioRef.current.currentTime = Number(value)
    setProgress(audioRef.current.currentTime)
  }
  
  const scrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  }

  const playPauseSwitch = () => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }

  const getTimeString = (value: number) => {
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)

    return `${minutes}:${seconds < 10 ? '0' + seconds.toString() : seconds}`
  }

  useEffect(() => {
    audioRef.current.pause()
    audioRef.current = new Audio(currentTrack?.audio)

    setProgress(audioRef.current.currentTime)
    playPauseSwitch()
    startTimer()
  }, [tracks])

  useEffect(() => {
    playPauseSwitch()
  }, [isPlaying])

  useEffect(() => {
    return () => {
      audioRef.current.pause()
      clearInterval(timerRef.current)
    }
  }, [])

  return (
      <Container css={isPlaying && css`
      background: radial-gradient(circle at bottom, #fff, transparent 70%),  
      linear-gradient(to top, #add8e6 0%, transparent 90%),    
      linear-gradient(to bottom, transparent, rgba(0,0,0, 0.4) 90%), #add8e6;
      animation: ${bg(currentTrack?.color || ['white', 'yellow'])} 10s infinite;
    `}>
        <TrackCover src={currentTrack?.cover}></TrackCover>
        <TrackArtist>{currentTrack?.artist}</TrackArtist>
        <TrackName>{currentTrack?.name}</TrackName>
        <PSContainer>
          <Time css={{marginRight: 8}}>{getTimeString(progress)}</Time>
          <ProgressScrubber
            type="range"
            value={progress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={scrubEnd}
            onKeyUp={scrubEnd}
          />
          <Time css={{marginLeft: 8}}>{!!duration && getTimeString(duration)}</Time>
        </PSContainer>
        <PlayerControls
          isPlaying={isPlaying}
          onPrevClick={playPrevTrack}
          onNextClick={playNextTrack}
          onPlayClick={setIsPlaying}
        />
      </Container>
  )
}

export default MP3Player