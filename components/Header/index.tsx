import React, { FC, useEffect, useState } from 'react';

import Link from 'next/link'
import { useRouter } from 'next/router'

import themeIcon from '../../assets/theme_icon.png';

import { Container, Title, OptionsContainer, TitleContainer, MinText } from './styles'

interface HeaderProps {
  // setToggleTheme(): void;
}

const Header: FC<HeaderProps> = () => {
  const router = useRouter()





  useEffect(() => {
    // const languageToChange = selectedLanguage === ptCode ? enCode : ptCode

    // setLanguageText(LANGUAGES[languageToChange].text)

    // i18n.changeLanguage(selectedLanguage)
  }, [])


  return (
    <Container>
      <Link href="/">
        <TitleContainer>
          <MinText>min</MinText>
          <Title>POKER</Title>
        </TitleContainer>
      </Link>

      <OptionsContainer>
        {/* <Language onClick={handleChangeLanguage}>{languageText}</Language> */}

        {/* <SwitchButton onClick={setToggleTheme}>
          <ButtonIcon src={themeIcon} />
        </SwitchButton> */}
      </OptionsContainer>
    </Container>
  )
}

export default Header
