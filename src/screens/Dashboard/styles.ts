import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
`

/** Header contendo logo, título e data/hora */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
`

/** Grupo logo + título */
export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

/** Logo */
export const Logo = styled.img`
  width: 55px;
  height: 55px;
  object-fit: contain;
`

/** Título plantarii */
export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #002E20;
`

export const DateTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  color: #2a5030;
`

export const DateText = styled.div`
  margin-bottom: 0.25rem;
  font-weight: 500;
`

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-weight: 600;
`

export const CardsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  width: 100%;
  height: 90vh;
`

export const CardsColumn = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  justify-content: space-between;
  height: 100%;
  width: ${({ width }) => width ?? 'auto'};
`

export const GenericCard = styled.div`
  height: 50px;
  flex: 1;
  width: 100%;
  background: black;
  border-radius: 8px;
`
