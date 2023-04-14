import { Col, Row,  Button } from 'antd'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import gamesImg from '../../../public/assets/images/cat.png'

const Games = () => {
  const router = useRouter()
  const gamesData = [
    { name: 'Collection 1', id: '100001' },
    { name: 'Collection 2', id: '100002' },
    { name: 'Collection 3', id: '100003' },
    { name: 'Collection 4', id: '100004' },
    { name: 'Collection 5', id: '100005' },
  ]

  const List = ({ data }) => {
    return (
      <>
        {data.map((pack, i) => (
            <Col span={6} gutter={[12, 12]} className="collection-wrapper" key={i}>
              <Link href={`/games/${pack.id}`}>
                <Row justify="center">
                  <Image src={gamesImg} width={150} height={150} alt="games" className="item-img" />
                </Row>
                <Row className="type" justify="center">
                  {pack.name}
                </Row>
                <Row className="id" justify="center">
                  {pack.id}
                </Row>
              </Link>
            </Col>
        ))}
      </>
    )
  }

  return (
    <>
      <section className="account">
        <div className="content">
          <Row justify="space-between" gutter={{ md: 16, sm: 8 }}>
            <List data={gamesData} />
          </Row>
        </div>
      </section>
    </>
  )
}

export default Games
