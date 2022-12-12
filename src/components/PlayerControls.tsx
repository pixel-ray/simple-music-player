import React from 'react'
import playImg from '../assets/play.svg'
import pauseImg from '../assets/pause.svg'
import arrowImg from '../assets/arrow.svg'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'

interface IProps {
    isPlaying: boolean,
	onPlayClick: React.Dispatch<React.SetStateAction<boolean>>,
    onPrevClick: () => void,
    onNextClick: () => void
}

const Container = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%'
})

const ArrowButton = styled.button({
    width: 20,
    height: 20,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    margin: 20
})

const PlayPauseButton = styled.button({
    width: 32,
    height: 32,
    margin: 20,
    cursor: 'pointer',
    border: 'none',
    background: 'none'
})

const PlayPauseButtonImg = styled.img({
    height: 28,
    transform: 'scale(2)'
})

const ArrowImg = styled.img({
    height: 20,
})

const MP3Player: React.FC<IProps> = ({ isPlaying,  onPlayClick, onPrevClick, onNextClick}) => {
  return (
      <Container>
            <ArrowButton onClick={onPrevClick}>
                <ArrowImg 
                    src={arrowImg} 
                    css={{transform: 'rotate(180deg)'}}
                />
                </ArrowButton>
            {isPlaying ? 
            <PlayPauseButton onClick={() => onPlayClick(false)}>
                <PlayPauseButtonImg src={pauseImg}/>
            </PlayPauseButton> 
            : <PlayPauseButton onClick={() => onPlayClick(true)}>
                    <PlayPauseButtonImg src={playImg}/>
                </PlayPauseButton>}
            <ArrowButton onClick={onNextClick}>
                <ArrowImg src={arrowImg}/>
            </ArrowButton>
      </Container>
  )
}

export default MP3Player

