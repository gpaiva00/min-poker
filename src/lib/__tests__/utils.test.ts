import { describe, it, expect } from 'vitest'
import { randomNames } from '@/constants/randomNames'

const { cn, detectInputType, FIBONACCI_SEQUENCE } = await import('../utils')

const generateFunnyName = () => {
  const randomName = randomNames[Math.floor(Math.random() * randomNames.length)]
  return randomName
}

describe('utils', () => {
  describe('cn', () => {
    it('deve fazer merge de classes CSS', () => {
      const result = cn('text-red-500', 'bg-blue-200')
      expect(result).toContain('text-red-500')
      expect(result).toContain('bg-blue-200')
    })

    it('deve lidar com classes condicionais', () => {
      const result = cn('base', true && 'active', false && 'inactive')
      expect(result).toContain('base')
      expect(result).toContain('active')
      expect(result).not.toContain('inactive')
    })

    it('deve fazer merge de classes Tailwind conflitantes', () => {
      const result = cn('p-4', 'p-8')
      expect(result).toBe('p-8')
    })

    it('deve lidar com undefined e null', () => {
      const result = cn('base', undefined, null, 'end')
      expect(result).toContain('base')
      expect(result).toContain('end')
    })

    it('deve lidar com arrays de classes', () => {
      const result = cn(['text-sm', 'font-bold'])
      expect(result).toContain('text-sm')
      expect(result).toContain('font-bold')
    })
  })

  describe('generateFunnyName', () => {
    it('deve retornar um nome da lista randomNames', () => {
      const name = generateFunnyName()
      expect(randomNames).toContain(name)
    })

    it('deve retornar uma string não vazia', () => {
      const name = generateFunnyName()
      expect(name).toBeTruthy()
      expect(typeof name).toBe('string')
      expect(name.length).toBeGreaterThan(0)
    })

    it('deve potencialmente retornar nomes diferentes em chamadas múltiplas', () => {
      const names = new Set()
      for (let i = 0; i < 50; i++) {
        names.add(generateFunnyName())
      }
      expect(names.size).toBeGreaterThan(1)
    })
  })

  describe('detectInputType', () => {
    describe('URLs completas', () => {
      it('deve detectar URL HTTP com código de sala', () => {
        const result = detectInputType(
          'http://example.com/room/abcd1234567890123456'
        )
        expect(result.type).toBe('existing_room')
        expect(result.value).toBe('abcd1234567890123456')
      })

      it('deve detectar URL HTTPS com código de sala', () => {
        const result = detectInputType(
          'https://minpoker.com/room/xyz-1234567890123456'
        )
        expect(result.type).toBe('existing_room')
        expect(result.value).toBe('xyz-1234567890123456')
      })

      it('deve extrair apenas o código da URL', () => {
        const result = detectInputType(
          'https://example.com/room/ABCD123456789012345X?param=value'
        )
        expect(result.type).toBe('existing_room')
        expect(result.value).toBe('ABCD123456789012345X')
      })
    })

    describe('Códigos Firebase (20 caracteres)', () => {
      it('deve detectar código Firebase válido', () => {
        const result = detectInputType('abcd1234567890123456')
        expect(result.type).toBe('existing_room')
        expect(result.value).toBe('abcd1234567890123456')
      })

      it('deve detectar código Firebase com hífens', () => {
        const result = detectInputType('abc-1234567890123456')
        expect(result.type).toBe('existing_room')
        expect(result.value).toBe('abc-1234567890123456')
      })

      it('deve detectar código Firebase com underscores', () => {
        const result = detectInputType('abc_1234567890123456')
        expect(result.type).toBe('existing_room')
        expect(result.value).toBe('abc_1234567890123456')
      })

      it('deve detectar código Firebase alfanumérico misto', () => {
        const result = detectInputType('AbC123XyZ456-_789012')
        expect(result.type).toBe('existing_room')
        expect(result.value).toBe('AbC123XyZ456-_789012')
      })
    })

    describe('Nomes de novas salas', () => {
      it('deve detectar nome de nova sala simples', () => {
        const result = detectInputType('Minha Sala de Poker')
        expect(result.type).toBe('new_room')
        expect(result.value).toBe('Minha Sala de Poker')
      })

      it('deve detectar texto curto como nome de sala', () => {
        const result = detectInputType('Sprint 23')
        expect(result.type).toBe('new_room')
        expect(result.value).toBe('Sprint 23')
      })

      it('deve detectar código Firebase muito curto como nome de sala', () => {
        const result = detectInputType('abc123')
        expect(result.type).toBe('new_room')
        expect(result.value).toBe('abc123')
      })

      it('deve detectar código Firebase muito longo como nome de sala', () => {
        const result = detectInputType('abcd1234567890123456789')
        expect(result.type).toBe('new_room')
        expect(result.value).toBe('abcd1234567890123456789')
      })

      it('deve remover espaços em branco', () => {
        const result = detectInputType('  Sala Teste  ')
        expect(result.type).toBe('new_room')
        expect(result.value).toBe('Sala Teste')
      })

      it('deve lidar com texto vazio', () => {
        const result = detectInputType('   ')
        expect(result.type).toBe('new_room')
        expect(result.value).toBe('')
      })
    })

    describe('Casos especiais', () => {
      it('deve lidar com string vazia', () => {
        const result = detectInputType('')
        expect(result.type).toBe('new_room')
        expect(result.value).toBe('')
      })

      it('deve lidar com URL mal formada', () => {
        const result = detectInputType('http://example.com/invalid')
        expect(result.type).toBe('new_room')
        expect(result.value).toBe('http://example.com/invalid')
      })

      it('deve lidar com código Firebase com caracteres especiais inválidos', () => {
        const result = detectInputType('abc@1234567890123456')
        expect(result.type).toBe('new_room')
        expect(result.value).toBe('abc@1234567890123456')
      })
    })
  })

  describe('FIBONACCI_SEQUENCE', () => {
    it('deve ter a sequência Fibonacci correta', () => {
      expect(FIBONACCI_SEQUENCE).toEqual([1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
    })

    it('deve ter 10 elementos', () => {
      expect(FIBONACCI_SEQUENCE).toHaveLength(10)
    })

    it('deve ser um array de números', () => {
      FIBONACCI_SEQUENCE.forEach(num => {
        expect(typeof num).toBe('number')
      })
    })

    it('deve começar com 1', () => {
      expect(FIBONACCI_SEQUENCE[0]).toBe(1)
    })

    it('deve terminar com 89', () => {
      expect(FIBONACCI_SEQUENCE[FIBONACCI_SEQUENCE.length - 1]).toBe(89)
    })
  })
})
