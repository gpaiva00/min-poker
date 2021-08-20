import React, { FC, useState } from 'react'
import { useSession } from 'next-auth/client'

import { Footer, Header, LatestRooms } from '../components'
import AccountModal from '../components/AccountModal'
import { CreateRoom } from '../components'
import { PageContainer } from '../styles/Home.styles'
import { MainContainer } from '../styles/global'

const Home: FC = () => {
  const [toggleAccountModal, setToggleAccountModal] = useState(false)
  const [session, loading] = useSession()

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
          user={{
            name: session?.user?.name,
            image: session?.user?.image,
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
