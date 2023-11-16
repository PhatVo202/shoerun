import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductAction, fetchProductFilterNameAction } from '../../stores/reducers/productReducer'
import { Button, Card, Segmented, Typography, Input, Rate } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Text, Link } = Typography

const Product = () => {
  const { Search } = Input
  const [pinCode, setPinCode] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.productReducer)
  const { Meta } = Card
  const [isProduct, setIsProduct] = useState([{ ...products, isHeart: false }])
  const { arrFavouriteProduct } = useSelector((state) => state.productReducer)

  useEffect(() => {
    dispatch(fetchProductAction())
  }, [])

  // useEffect(() => {
  //   const indexFav = arrFavouriteProduct.findIndex((item)=>item.id ===)
  // }, [])

  useEffect(() => {
    const getData = setTimeout(() => {
      pinCode === '' ? dispatch(fetchProductAction()) : dispatch(fetchProductFilterNameAction(pinCode))
    }, 200)
    return () => clearTimeout(getData)
  }, [pinCode])

  const handleHeartClick = (idx) => {
    
  }
  const renderCard = () => {
    return products?.map((shoe) => {
      return (
        <div className='col-3 my-4' key={shoe.id} style={{ position: 'relative' }}>
          <Card onClick={() => console.log(shoe.id)} hoverable cover={<img alt='example' src={shoe.image} />}>
            <Meta title={<Rate disabled defaultValue={5} />} />
            <Meta
              title={shoe.name}
              description={
                shoe.description.length > 100 ? shoe.description.substring(0, 100) + '...' : shoe.description
              }
            />

            <Text type='danger'>
              <h4 style={{ color: '#ff4d4f' }}>${shoe.price}</h4>
            </Text>

            <Button block onClick={() => navigate(`/detail/${shoe.id}`)}>
              Buy now
            </Button>
          </Card>
          <span style={{ position: 'absolute', top: 10, right: 25, cursor: 'pointer', fontSize: '20px' }}>
            {/* {isHeart ? (
              <span onClick={() => handleHeartClick(shoe.id)}>🩷</span>
            ) : (
              <span onClick={() => handleHeartClick(shoe.id)}>♡</span>
            )} */}
          </span>
        </div>
      )
    })
  }

  const handleSelectedType = (keyword) => {
    dispatch(fetchProductFilterNameAction(keyword))
  }

  const handeChange = (e) => {
    setPinCode(e.target.value)
  }
  return (
    <>
      <div className='container'>
        <Segmented
          className='my-3'
          size='large'
          options={['nike', 'adidas', 'vans', 'converse']}
          onChange={(e) => handleSelectedType(e)}
        />
        <Search placeholder='input search text' enterButton onChange={handeChange} />
        <div className='row'>{renderCard()}</div>
      </div>
    </>
  )
}

export default Product
