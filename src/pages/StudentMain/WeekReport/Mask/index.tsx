import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import deleteIcon from '../../../../assets/imgs/delete.png'
import circleIcon from '../../../../assets/imgs/circle.png'
import foldIcon from '../../../../assets/imgs/fold.png'
import unFoldIcon from '../../../../assets/imgs/unfold.png'
import { IFirstComment, IPart } from '../../../../libs/model'
import { Button, Input, message } from 'antd'
import { commentPost, getFirstComments } from '../../../../api/teacherApi/report'
import FirstComment from '../RecordItem/FirstComment'

interface Props {
  close: () => void
  time: string | undefined
  report: IPart[]
  isCommentComponent: boolean
  reportId?: string
  reportUserId?: string
  getReportInfos?: () => void
}

export default function Mask ({ close, time, report, isCommentComponent, reportId, reportUserId, getReportInfos }: Props) {
  // 记录是否折叠
  const [isFold, setIsFold] = useState(Boolean)
  // 评论
  const [comment, setComment] = useState('')
  // 一级评论
  const [firstComments, setFirstComments] = useState<IFirstComment[]>([])
  const returnTitle = (type: 'progress' | 'plan' | 'teamService', index: number) => {
    switch (type) {
      case 'progress':
        return `[进展${index + 1}]`
      case 'plan':
        return `[计划${index + 1}]`
      case 'teamService':
        return `[团队服务${index + 1}]`
    }
  }

  // 周报评论
  const postComment = async () => {
    if (comment.length > 0) {
      if (reportId && reportUserId) {
        const res = await commentPost(reportId, reportUserId, comment)
        if (res?.success) {
          if (getReportInfos) {
            getReportInfos()
          }
          FirstCommentsGetAction()
          message.success(res.msg)
          setComment('')
        }
      }
    } else {
      message.info('评论不为空')
    }
  }

  // 得到评论
  const FirstCommentsGetAction = async () => {
    if (reportId) {
      const res = await getFirstComments(reportId)
      if (res?.success) {
        setFirstComments(res.data)
      }
    }
  }

  useEffect(() => {
    if (isCommentComponent) {
      FirstCommentsGetAction()
    }
  }, [])
  return (
    <div className={style.mask_back}>
      <div className={style.main}>
        <div className={style.title}>周报</div>
        <div className={style.date} id='time'>
          {time}
        </div>
        <div className={style.partOne}>
          <div className={style.headOne}>一、本周进展</div>
          <div className={style.partTwo}>
            {
              report.filter(item => item.type === 'progress').map((item, index) =>
                <div
                  key={item.id}
                  className={style.plate_box}
                >
                  <div className={style.headTwo}>
                    <span>{returnTitle('progress', index)}</span>
                    <div className={style.inputTitle}>{item.title}</div>
                  </div>
                  <div className={style.partThree}>
                    {
                      item.point.map((point, pointIndex) =>
                        <div key={point.id} className={style.headThree}>
                          <div>{`${++pointIndex}. ${point.title}`}</div>
                          <div className={style.textLine_box}>
                            {
                              point.text.map((text) =>
                                <div key={text.id} className={style.lineText}>
                                  <img className={style.icon} src={circleIcon}></img>
                                  <div className={style.lineInput}>{text.content}</div>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className={style.partOne}>
          <div className={style.headOne}>二、下周计划</div>
          <div className={style.partTwo}>
            {
              report.filter(item => item.type === 'plan').map((item, index) =>
                <div
                  key={item.id}
                  className={style.plate_box}
                >
                  <div className={style.headTwo}>
                    <span>{returnTitle('plan', index)}</span>
                    <div className={style.inputTitle}>{item.title}</div>
                  </div>
                  <div className={style.partThree}>
                    {
                      item.point.map((point, pointIndex) =>
                        <div key={point.id} className={style.headThree}>
                          <div>{`${++pointIndex}. ${point.title}`}</div>
                          <div className={style.textLine_box}>
                            {
                              point.text.map((text) =>
                                <div key={text.id} className={style.lineText}>
                                  <img className={style.icon} src={circleIcon}></img>
                                  <div className={style.lineInput}>{text.content}</div>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>
        {
          report.filter(item => item.type === 'teamService').length
            ? <div className={style.partOne}>
              <div className={style.headOne}>三、团队服务</div>
              <div className={style.partTwo}>
                {
                  report.filter(item => item.type === 'teamService').map((item, index) =>
                    <div
                      key={item.id}
                      className={style.plate_box}
                    >
                      <div className={style.headTwo}>
                        <span>{returnTitle('teamService', index)}</span>
                        <div className={style.inputTitle}>{item.title}</div>
                      </div>
                      <div className={style.partThree}>
                        {
                          item.point.map((point, pointIndex) =>
                            <div key={point.id} className={style.headThree}>
                              <div>{`${++pointIndex}. ${point.title}`}</div>
                              <div className={style.textLine_box}>
                                {
                                  point.text.map((text) =>
                                    <div key={text.id} className={style.lineText}>
                                      <img className={style.icon} src={circleIcon}></img>
                                      <div className={style.lineInput}>{text.content}</div>
                                    </div>
                                  )
                                }
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
            : ''
        }
      </div>
      <div>
        <div className={style.close_box} onClick={() => close()}>
          <img src={deleteIcon} className={style.deleteIcon}></img>
        </div>
        {
          isCommentComponent
            ? <div className={style.comment_box}>
              {
                isFold
                  ? <div>
                    <img
                      src={unFoldIcon}
                      className={style.foldIcon}
                      onClick={() => setIsFold(false)}
                    ></img>
                  </div>
                  : <>
                    <div className={style.post_box}>
                      <Input.TextArea
                        autoSize
                        placeholder='输入评论'
                        className={style.comment_input}
                        value={comment}
                        onChange={(e) => setComment(e.target.value.trim())}
                      ></Input.TextArea>
                      <Button
                        type='primary'
                        disabled={comment.length <= 0}
                        onClick={() => postComment()}
                      >回复</Button>
                      <img
                        src={foldIcon}
                        className={style.foldIcon}
                        onClick={() => setIsFold(true)}
                      ></img>
                    </div>
                    <div className={style.comments_box}>
                      {
                        firstComments.map(item =>
                          <FirstComment item={item} key={item.id}></FirstComment>
                        )
                      }
                    </div>
                  </>
              }
            </div>
            : ''
        }
      </div>
    </div>
  )
}
