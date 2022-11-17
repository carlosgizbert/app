import React, { useState } from 'react'
import Button from '../components/Button'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'

import * as S from './styles'

export default function Main() {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <S.Container>
        <Header />
        <S.CategoriesContainer>
          <Categories />
        </S.CategoriesContainer>
        <S.MenuContainer>
          <Menu />
        </S.MenuContainer>
      </S.Container>
      <S.Footer>
        <S.FooterContainer>
          <Button label="Novo pedido" onPress={() => setShowModal(true)} />
        </S.FooterContainer>
      </S.Footer>
      <TableModal visible={showModal} onClickClose={() => setShowModal(false)} onSubmit={alert} />
    </>
  )
}
