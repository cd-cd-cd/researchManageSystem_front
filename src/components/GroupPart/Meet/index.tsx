import { Col, Row, Tag } from 'antd'
import React from 'react'
import style from './index.module.scss'
export default function Meet () {
  const returnTag = (status: number) => {
    switch (status) {
      case -1:
        return <Tag color='#108ee9'>已结束</Tag>
      case 0:
        return <Tag color='#2db7f5'>进行中</Tag>
      case 1:
        return <Tag color='#87d068'>未开始</Tag>
    }
  }
  return (
    <div className={style.box}>
      <div className={style.header}>
        {returnTag(-1)}
        <span className={style.title}>中期考核</span>
      </div>
      <div className={style.main}>
        <Row gutter={[8, 4]}>
          <Col span={4} style={{ textAlign: 'end' }}>发起人：</Col>
          <Col span={20}>ccdd</Col>
          <Col span={4} style={{ textAlign: 'end' }}>参会人：</Col>
          <Col span={20}>张三、李四、王五</Col>
          <Col span={4} style={{ textAlign: 'end' }}>地点：</Col>
          <Col span={20}>教三409</Col>
          <Col span={4} style={{ textAlign: 'end' }}>时间：</Col>
          <Col span={20}>2023-02-08 13:20 --- 2023-02-14 20:18</Col>
          <Col span={4} style={{ textAlign: 'end' }}>简要：</Col>
          <Col span={20}>巴拉巴拉巴拉巴拉</Col>
          <Col span={4} style={{ textAlign: 'end' }}>文件：</Col>
          <Col span={20}>巴拉巴拉巴拉巴拉</Col>
        </Row>
      </div>
    </div>
  )
}
