import { Button, Modal } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { getFirstComments } from '../../../../api/teacherApi/report'
import { IFirstComment, IHistoryReport } from '../../../../libs/model'
import Mask from '../Mask'
import style from './index.module.scss'
import FirstComment from './FirstComment'
interface Props {
  report: IHistoryReport
}
export default function RecordItem ({ report }: Props) {
  const [isMask, setIsMask] = useState<boolean>(false)
  const [isModal, setIsModal] = useState(false)
  // 一级评论
  const [firstComments, setFirstComments] = useState<IFirstComment[]>([])

  const FirstCommentsGet = async () => {
    setIsModal(true)
    const res = await getFirstComments(report.id)
    if (res?.success) {
      setFirstComments(res.data)
    }
  }

  return (
    <div className={style.back}>
      <div>
        <div>{`${report.time} 周报`}</div>
        <div className={style.time}>创建时间：{dayjs(report.createdTime).format('YYYY-MM-DD HH:MM')}</div>
      </div>
      <div>
        <Button className={style.info_btn} onClick={() => FirstCommentsGet()}>消息</Button>
        <Button
          type='default'
          onClick={() => setIsMask(true)}
        >周报详情</Button>
        {
          isMask
            ? <Mask
              isCommentComponent={false}
              close={() => setIsMask(false)}
              time={report.time}
              report={report.text}
            ></Mask>
            : ''
        }
      </div>
      <Modal
        width={700}
        open={isModal}
        onCancel={() => setIsModal(false)}
        title="消息"
        footer={null}
      >
        {
          firstComments.length
            ? firstComments.map(item =>
              <FirstComment key={item.id} item={item}></FirstComment>
            )
            : '暂无消息'
        }
      </Modal>
    </div>
  )
}
