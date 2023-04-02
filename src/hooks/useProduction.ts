import { message } from 'antd'
import { pass, returnAsk } from '../api/teacherApi/production'
import { IProduction } from '../libs/model'

export default function useProduction () {
  const passClick = async (type: IProduction, id: string, func: Function) => {
    const res = await pass(type, id)
    if (res?.success) {
      func()
      message.success(res.msg)
    } else {
      message.info('操作失败请稍后再试！')
    }
  }
  const returnClick = async (type: IProduction, id: string, func: Function) => {
    const res = await returnAsk(type, id)
    if (res?.success) {
      func()
      message.success(res.msg)
    } else {
      message.info('操作失败请稍后再试！')
    }
  }
  return {
    passClick,
    returnClick
  }
}
