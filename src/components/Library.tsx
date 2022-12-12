import React from 'react'
import { Track }  from '../tracks'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'

interface IProps {
  tracks: Track[],
  updateTracksStatus: (activeId: string) => void
}

interface TCProps {
  active?: boolean
}

const Container = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  minWidth: 200, 
  padding: 4,
  paddingLeft: 0,
  boxShadow: 'rgba(50, 50, 93, 0.1) 0 0 60px 0, rgba(0, 0, 0, 0.2) 0 0 40px 0;',
  overflow: 'scroll'
})

const LibraryTitle = styled.div({
  display: 'flex',
  padding: 28,
  marginLeft: 4,
  fontSize: 22,
  fontWeight: 'bold',
  color: '#363636'
})

const TrackCard = styled('div')<TCProps> `
  display: flex;
  padding: 16px;
  cursor: pointer;
  background: ${(props: TCProps) => props.active && '#9CB8E7'};
`

const TrackCover = styled.img({
  marginLeft: 16,
  width: 72
})

const TrackDescription = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 12,
  color: '#615E57'
})

const TrackName = styled.div({
  fontSize: 14,
  fontWeight: 500
})

const TrackArtist = styled.div({
  fontSize: 10,
  fontWeight: 500
})

const Library: React.FC<IProps> = ({ tracks, updateTracksStatus }) => {
  const renderList = (): JSX.Element[] => {
    return tracks.map(track => (
        <TrackCard key={track.id} onClick = {() => updateTracksStatus(track.id)} active={track.active}>
          <TrackCover
            src={track?.cover}
          />
          <TrackDescription>
            <TrackName>{track.name}</TrackName>
            <TrackArtist>{track.artist}</TrackArtist>
          </TrackDescription> 
        </TrackCard>
  ))}

  return (
      <Container>
        <LibraryTitle>Library</LibraryTitle>
        <div>
          {renderList()}
        </div>
      </Container>
  )
}

export default Library