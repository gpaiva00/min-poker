import styled from 'styled-components'
import Button from '../components/Button'

import { MdEdit } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'

import { AiFillMinusCircle } from 'react-icons/ai'

import { lighten } from 'polished'
import { LIGHTEN_AMOUNT_NORMAL } from '../constants'

export const Container = styled.div`
  display: flex;
  flex: 1;
  /* flex-direction: ; */
  align-items: center;
  justify-content: center;
  /* background: lightgrey; */

  /* width: 100%; */
  height: 450px;

  /* margin: ${({ theme }) => `0 ${theme.margins.xl}`}; */

  /* @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    align-items: center;
  } */

  /* background: darkgray; */
`

export const PanelContainer = styled.div`
  display: flex;
  /* flex: 1; */
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  height: 100%;
  width: 80%;

  /* background: lightsalmon; */

  /* @media (max-width: 768px) {
    width: 100%;
    height: 80vh;
    ${({ theme }) => `padding: 0 ${theme.margins.s}`};
    margin-bottom: 100px;
  } */

  /* background: lightblue; */
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`

export const EditIcon = styled(MdEdit)`
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => lighten(LIGHTEN_AMOUNT_NORMAL, theme.colors.text)};
  }
`

export const DoneIcon = styled(FaCheck)`
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => lighten(LIGHTEN_AMOUNT_NORMAL, theme.colors.text)};
  }
`

export const ViewerModeIcon = styled(FaRegEye)`
  color: ${({ theme }) => theme.colors.smoke};
`

export const RemoveIcon = styled(AiFillMinusCircle)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.danger};

  &:hover {
    color: ${({ theme }) =>
      lighten(LIGHTEN_AMOUNT_NORMAL, theme.colors.danger)};
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.s};

  margin-bottom: ${({ theme }) => theme.margins.s};
  color: ${({ theme }) => theme.colors.text};

  text-transform: uppercase;
`
