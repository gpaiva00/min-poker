export const returnInviteLink = (roomId: string | string[]) => {
  const minPokerURL =
    process.env.NODE_ENV !== 'production'
      ? process.env.NEXT_PUBLIC_MIN_POKER_DEV_URL
      : process.env.NEXT_PUBLIC_MIN_PRD_URL

  const inviteLink = `${minPokerURL}/invitation/${roomId}`
  return inviteLink
}
