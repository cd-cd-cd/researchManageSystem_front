import React from 'react'
import { IProductionState } from '../../libs/model'
import { Tag } from 'antd'

interface Props {
  state: IProductionState
}

export default function TRenderState ({ state }: Props) {
  const renderState = (state: IProductionState) => {
    switch (state) {
      case -1:
        return <Tag color='green'>待审核</Tag>
      case 1:
        return <Tag color='red'>已驳回</Tag>
      case 0:
        return <Tag color='blue'>已通过</Tag>
    }
  }
  return (
    <>
      {renderState(state)}
    </>
  )
}
