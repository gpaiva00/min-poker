import React, { FC, useState } from 'react'

import { Footer, Header, LatestRooms } from '../components'
import AccountModal from '../components/AccountModal'
import { CreateRoom } from '../components'
import { PageContainer } from '../styles/Home.styles'
import { MainContainer } from '../styles/global'
import { useUserInfo } from '../utils'

const Home: FC = () => {
  const [toggleAccountModal, setToggleAccountModal] = useState(false)
  const {
    userInfo: { name, image },
    session,
    loading,
  } = useUserInfo()

  return (
    <MainContainer>
      <main>
        <AccountModal
          toggle={toggleAccountModal}
          setToggleModal={setToggleAccountModal}
        />

        <Header
          showOptions={false}
          setToggleAccountModal={setToggleAccountModal}
          loading={loading}
          session={session}
          user={{
            name,
            image,
          }}
        />

        <LatestRooms />

        <PageContainer>
          <CreateRoom />
        </PageContainer>
        <Footer />
      </main>
    </MainContainer>
  )
}

export default Home
