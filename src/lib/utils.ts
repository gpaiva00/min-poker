import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { randomNames } from '@/constants/randomNames'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateFunnyName() {
  const randomName = randomNames[Math.floor(Math.random() * randomNames.length)]
  return randomName
}

/**
 * Verifica se o input é um código de sala existente ou um nome para criar nova sala
 * @param input Texto inserido pelo usuário
 * @returns Objeto com o tipo de entrada e o valor processado
 */
export function detectInputType(input: string) {
  // Remover espaços em branco
  const trimmedInput = input.trim()

  // Verificar se é uma URL completa (http://{dominio}/room/{codigo})
  const urlPattern = /https?:\/\/[^\/]+\/room\/([a-zA-Z0-9_-]{20})/
  const urlMatch = trimmedInput.match(urlPattern)

  if (urlMatch) {
    return {
      type: 'existing_room',
      value: urlMatch[1] // Extrair apenas o código da sala da URL
    }
  }

  // Verificar se é um código Firebase (20 caracteres alfanuméricos com possíveis hífens)
  const firebaseIdPattern = /^[a-zA-Z0-9_-]{20}$/
  if (firebaseIdPattern.test(trimmedInput)) {
    return {
      type: 'existing_room',
      value: trimmedInput
    }
  }

  // Qualquer outro input é considerado nome para nova sala
  return {
    type: 'new_room',
    value: trimmedInput
  }
}

export const FIBONACCI_SEQUENCE = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
