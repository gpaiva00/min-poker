import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 745px;

  margin-left: ${({ theme }) => theme.margins.medium};

  @media (max-width: 768px) {
    height: 100vh;
    margin-left: 0;
    /* margin: 0; */
  }
`
