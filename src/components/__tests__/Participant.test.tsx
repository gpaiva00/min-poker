import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Participant } from '../Participant'

describe('Participant', () => {
  describe('Modo voting', () => {
    it('deve renderizar participante que não votou', () => {
      render(
        <Participant
          id='user-1'
          name='Test User'
          isCurrentUser={false}
          mode='voting'
          hasVoted={false}
        />
      )

      expect(screen.getByText('Test User')).toBeInTheDocument()
      expect(screen.getByText('Aguardando')).toBeInTheDocument()
    })

    it('deve renderizar participante que já votou', () => {
      render(
        <Participant
          id='user-1'
          name='Test User'
          isCurrentUser={false}
          mode='voting'
          hasVoted={true}
        />
      )

      expect(screen.getByText('Test User')).toBeInTheDocument()
      expect(screen.getByText('Votou')).toBeInTheDocument()
    })

    it('deve renderizar participante em modo de visualização', () => {
      render(
        <Participant
          id='user-1'
          name='Observer'
          isCurrentUser={false}
          isViewMode={true}
          mode='voting'
        />
      )

      expect(screen.getByText('Observer')).toBeInTheDocument()
      expect(screen.getByText('Observando')).toBeInTheDocument()
    })

    it('deve mostrar badge "Você" para usuário atual', () => {
      render(
        <Participant
          id='user-1'
          name='Current User'
          isCurrentUser={true}
          mode='voting'
          hasVoted={false}
        />
      )

      expect(screen.getByText('Current User')).toBeInTheDocument()
      expect(screen.getByText('Você')).toBeInTheDocument()
    })

    it('deve aplicar estilos diferentes para usuário atual', () => {
      const { container } = render(
        <Participant
          id='user-1'
          name='Current User'
          isCurrentUser={true}
          mode='voting'
          hasVoted={false}
        />
      )

      const participantDiv = container.firstChild as HTMLElement
      expect(participantDiv).toHaveClass('ring-2')
    })

    it('deve aplicar estilos para participante que votou', () => {
      const { container } = render(
        <Participant
          id='user-1'
          name='Voted User'
          isCurrentUser={false}
          mode='voting'
          hasVoted={true}
        />
      )

      const participantDiv = container.firstChild as HTMLElement
      expect(participantDiv).toHaveClass('border-2')
    })
  })

  describe('Modo results', () => {
    it('deve renderizar valor do voto', () => {
      render(
        <Participant
          id='user-1'
          name='Test User'
          isCurrentUser={false}
          mode='results'
          voteValue={8}
        />
      )

      expect(screen.getByText('Test User')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
    })

    it('deve mostrar badge "Você" para usuário atual nos resultados', () => {
      render(
        <Participant
          id='user-1'
          name='Current User'
          isCurrentUser={true}
          mode='results'
          voteValue={5}
        />
      )

      expect(screen.getByText('Current User')).toBeInTheDocument()
      expect(screen.getByText('Você')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('deve aplicar estilos diferentes para usuário atual nos resultados', () => {
      const { container } = render(
        <Participant
          id='user-1'
          name='Current User'
          isCurrentUser={true}
          mode='results'
          voteValue={13}
        />
      )

      const participantDiv = container.firstChild as HTMLElement
      expect(participantDiv).toHaveClass('border-primary/20')
    })

    it('deve renderizar com valor de voto 0', () => {
      render(
        <Participant
          id='user-1'
          name='Test User'
          isCurrentUser={false}
          mode='results'
          voteValue={0}
        />
      )

      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('deve renderizar modo voting se voteValue for null no modo results', () => {
      render(
        <Participant
          id='user-1'
          name='Test User'
          isCurrentUser={false}
          mode='results'
          voteValue={null}
        />
      )

      expect(screen.getByText('Test User')).toBeInTheDocument()
      expect(screen.getByText('Aguardando')).toBeInTheDocument()
    })

    it('deve renderizar modo voting se voteValue for undefined no modo results', () => {
      render(
        <Participant
          id='user-1'
          name='Test User'
          isCurrentUser={false}
          mode='results'
        />
      )

      expect(screen.getByText('Test User')).toBeInTheDocument()
      expect(screen.getByText('Aguardando')).toBeInTheDocument()
    })
  })

  describe('Props obrigatórias', () => {
    it('deve aceitar todas as props sem erros', () => {
      expect(() => {
        render(
          <Participant
            id='user-1'
            name='Test User'
            isCurrentUser={false}
            mode='voting'
            hasVoted={false}
            voteValue={null}
          />
        )
      }).not.toThrow()
    })

    it('deve renderizar com props mínimas', () => {
      expect(() => {
        render(
          <Participant
            id='user-1'
            name='Test User'
            isCurrentUser={false}
            mode='voting'
          />
        )
      }).not.toThrow()
    })
  })
})
