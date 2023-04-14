import { Col, Row,  Button, Typography } from 'antd'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const { Text } = Typography;

const Result = () => {
  const router = useRouter()
  const { tx_id } = router.query
  const [stage, setStage] = useState(0);
  const stageTexts = ['Waiting for drawing  🚀', 'Congrats 🎉'];
  const data = [
    { name: 'Collection 1', id: '100001' },
    { name: 'Collection 2', id: '100002' },
    { name: 'Collection 3', id: '100003' },
    { name: 'Collection 4', id: '100004' },
    { name: 'Collection 5', id: '100005' },
  ]

  const ResultContent = ({ data }) => {
    return (
      <>
        {data.map((pack, i) => (
            <Col span={24} gutter={[12, 12]} className="collection-wrapper" key={i}>
              <Row className="type" justify="center">
                {pack.name}
              </Row>
              <Row className="id" justify="center">
                {pack.id}
              </Row>
            </Col>
        ))}
      </>
    )
  }

  return (
    <>
      <section className="account">
        <div className="content">
          <Row align={'middle'} gutter={[0, 24]}>
            <Col span={12} offset={6}>
              <Row justify={'center'}>
                <Text style={{ color: 'white' }}>
                  {tx_id}
                </Text>
              </Row>
            </Col>
            <Col span={12} offset={6}>
              <Row justify={'center'}>
                <Text style={{ color: 'white' }}>
                  {stageTexts[stage]}
                </Text>
              </Row>
            </Col>
            <Col span={12} offset={6}>
              <Row justify={'center'}>
                <ResultContent data={data} />
              </Row>
            </Col>
            {stage === 1 ? (
            <Col span={8} offset={8}>
              <Link href={'/account'}>
                <Button type={'primary'} block size='large'>
                  Check
                </Button>
              </Link>
            </Col>
            ) : ''}
          </Row>
        </div>
      </section>
    </>
  )
}

export default Result
