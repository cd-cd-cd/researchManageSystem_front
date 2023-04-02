import { Tag } from 'antd'
import React from 'react'
import { IProductionState } from '../../libs/model'

interface Props {
  state: IProductionState
}

export default function RenderState ({ state }: Props) {
  const renderState = (state: IProductionState) => {
    switch (state) {
      case -1:
        return <Tag color='green'>审核中</Tag>
      case 1:
        return <Tag color='red'>被驳回</Tag>
      case 0:
        return <Tag color='blue'>通过</Tag>
    }
  }
  return (
    <>
    {renderState(state)}
    </>
  )
}
