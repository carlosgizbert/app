import { useEffect, useState } from 'react'

import { StatusBar } from 'expo-status-bar'

import { Button } from '../components/Button'
import { Cart } from '../components/Cart'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'
import { CartItem } from '../types/CartItem'

import { Empty } from '../components/Icons/Empty'
import { Text } from '../components/Text'

import { Product } from '../types/Product'
import { Category } from '../types/Category'

import { useGetCategories, useGetProductsByCategory } from '../service'

import * as S from './styles'

export default function Main() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [cartItems, setCartIems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<null | Product[]>()
  const [categories, setCategories] = useState<null | Category[]>()
  const [currentCategory, setCurrentCategory] = useState<string>('')

  const { data: getCategories, isLoading: getCategoriesLoading } = useGetCategories()
  const { data: getProducts, isLoading: getProductsLoading, refetch: refetchProductsByCategory } = useGetProductsByCategory(currentCategory)

  const handleSubmitTable = (tableId: string) => {
    setSelectedTable(tableId)
    setShowModal(false)
  }

  const handleAddToCart = (product: Product) => {
    if(!selectedTable) {
      setShowModal(true)
    }
    setCartIems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id)

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        })
      }

      const newCartItems = [...prevState]
      const item = newCartItems[itemIndex]

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      }


      return newCartItems
    })
  }

  const handleDecrementCartItem = (product: Product) => {
    setCartIems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id)

      const item = prevState[itemIndex]
      const newCartItems = [...prevState]

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1)

        return newCartItems
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      }

      return newCartItems
    })
  }

  const handleResetOrder = () => {
    setSelectedTable('')
    setCartIems([])
  }

  const renderCategories = (categories: Category[]) => {
    return (
      <S.CategoriesContainer>
        <Categories categories={categories} onSelectCategory={setCurrentCategory} />
      </S.CategoriesContainer>
    )
  }

  const renderLoadingList = () => {
    return (
      <Text>Carregando</Text>
    )
  }

  const renderEmptyProducts = () => {
    return (
      <S.CenteredContainer>
        <Empty />
        <Text color='#667' style={{ marginTop: 24 }}>Nenhum produto encontrado</Text>
      </S.CenteredContainer>
    )
  }

  useEffect(() => {
    if (getCategories) setCategories(getCategories)
  }, [getCategories])

  useEffect(() => {
    if (getProducts) setProducts(getProducts)
  }, [getProducts])

  useEffect(() => {
    refetchProductsByCategory()
  }, [currentCategory])

  return (
    <>
      <StatusBar style="dark" />
      <S.Container>
        <Header selectedTable={selectedTable} onClickCancel={handleResetOrder} />
        {!getCategoriesLoading && !!categories && renderCategories(categories)}
        {getProductsLoading && renderLoadingList()}
        {!getProductsLoading && !!products &&
        <Menu products={products} onClickAddToCart={handleAddToCart} />}
        {!getProductsLoading && products?.length === 0 && renderEmptyProducts()}
      </S.Container>
      <S.Footer>
        {!selectedTable && (
          <S.FooterContainer>
            <Button label="Novo pedido" onPress={() => setShowModal(true)} />
          </S.FooterContainer>
        )}
        {selectedTable && (
          <Cart
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCartItem}
            onConfirmOrder={handleResetOrder}
            selectedTable={selectedTable}
          />
        )}
      </S.Footer>
      <TableModal visible={showModal} onClickClose={() => setShowModal(false)} onSubmit={(tableId) => handleSubmitTable(tableId)} />
    </>
  )
}
