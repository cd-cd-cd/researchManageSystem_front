import { Button, Input, message, Tag } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { IFirstComment, ISecondComment } from '../../../../../libs/model'
import verticalIcon from '../../../../../assets/imgs/verticalIcon.png'
import style from './index.module.scss'
import { getSecondComments, replyComment } from '../../../../../api/studentApi/report'

interface Props {
  item: IFirstComment
}
export default function FirstComment ({ item }: Props) {
  const [commentIng, setCommontIng] = useState(false)
  const [secondComment, setSecondComment] = useState('')
  const [isFold, setIsFold] = useState(true)
  // 二级评论
  const [list, setList] = useState<ISecondComment[]>()
  // 回复
  const replyCommonAction = async (item: IFirstComment) => {
    const res = await replyComment(item.id, item.comment_user.trueId, secondComment)
    if (res?.success) {
      message.success(res.msg)
      getSecond()
      reset()
    }
  }

  // 清空
  const reset = () => {
    setCommontIng(false)
    setSecondComment('')
  }

  const getSecond = async () => {
    setIsFold(false)
    const res = await getSecondComments(item.id)
    if (res?.success) {
      setList(res.data)
    }
  }
  return (
    <div className={style.line_box}>
      <div>
        <Tag color='gray' className={style.tag}>{item.comment_user.name}</Tag>
        <span>{item.commentContent}</span>
      </div>
      <div className={style.time_box}>
        <div>{dayjs(item.createdTime).format('YYYY-MM-DD HH:MM')}</div>
        {
          commentIng
            ? <img src={verticalIcon} className={style.verticalIcon} onClick={() => reset()}></img>
            : <div className={style.reply_btn} onClick={() => setCommontIng(true)}>回复</div>
        }
      </div>
      {
        commentIng
          ? <div className={style.input_box}>
            <Input.TextArea
              onChange={(e) => setSecondComment(e.target.value)}
              value={secondComment}
              autoSize
            ></Input.TextArea>
            <Button
              size='small'
              disabled={secondComment.length <= 0}
              className={style.input_btn}
              onClick={() => replyCommonAction(item)}
            >回复</Button>
          </div>
          : ''
      }
      {
        isFold
          ? <div className={style.reply_btn} onClick={() => getSecond()}>查看回复</div>
          : <>
            <img src={verticalIcon} className={style.fold} onClick={() => setIsFold(true)}></img>
            <div className={style.lists}>
              {
                list?.map(list =>
                  <div key={list.id}>
                    <div className={style.content}>
                      <span className={style.name}>{list.comment_user.name}:</span>
                      <span>{list.secondComment}</span>
                    </div>
                  </div>)
              }
            </div>
          </>
      }
    </div>
  )
}
