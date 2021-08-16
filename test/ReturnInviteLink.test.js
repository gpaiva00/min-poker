import { returnInviteLink } from '../utils'

process.env.NEXT_PUBLIC_MIN_POKER_DEV_URL = 'https://min-poker-dev.vercel.app'

const roomId = '123'
const expected = `${process.env.NEXT_PUBLIC_MIN_POKER_DEV_URL}/invitation/${roomId}`

describe('Return Invite Link', () => {
  it('Assert correct invite link', () => {
    const test = returnInviteLink(roomId)
    expect(test).toEqual(expected)
  })
})
