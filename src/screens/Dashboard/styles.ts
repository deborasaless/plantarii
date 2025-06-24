// src/components/Dashboard/Dashboard.styles.ts
import styled from 'styled-components'

export const Container = styled.div`
  margin: 1.5rem 2rem;
  padding: 0 1rem;
`

/** Header contendo logo, título e data/hora */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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

export const CardsRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`

export const Card = styled.div`
  flex: 1;
  height: 150px;
  background: #333;
  border-radius: 8px;
`
