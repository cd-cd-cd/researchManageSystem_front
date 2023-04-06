import React from 'react'
import deleteIcon from '../../../src/assets/imgs/delete.png'
import style from './index.module.scss'
import { IResGeTInfo } from '../../api/studentApi/project'
import { IProgress } from '../../libs/model'
import { Descriptions } from 'antd'
import dayjs from 'dayjs'
import ProjectItem from './ProjectItem'

interface Props {
  setIsProgress: (a: boolean) => void
  singleInfo: IResGeTInfo | undefined
  progressInfo: IProgress[] | undefined
}
export default function ProjectShow ({ setIsProgress, singleInfo, progressInfo }: Props) {
  return (
    <div className={style.back}>
      <div className={style.main}>
        <img src={deleteIcon} className={style.icon} onClick={() => setIsProgress(false)}></img>
        <div className={style.single}>
          <Descriptions title={singleInfo?.title}>
            <Descriptions.Item label="项目负责人">{singleInfo?.manager.name}</Descriptions.Item>
            <Descriptions.Item label="项目成员" span={2}>{singleInfo?.teammate.map(user => <span className={style.span} key={user.id}>{user.name}</span>)}</Descriptions.Item>
            <Descriptions.Item label="开始时间">{dayjs(singleInfo?.startTime).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="截止时间">{dayjs(singleInfo?.endTime).format('YYYY-MM-DD')}</Descriptions.Item>
          </Descriptions>
        </div>
        <div>
          {
            progressInfo
              ? progressInfo.map(item => <ProjectItem key={item.id} info={item}></ProjectItem>)
              : ''
          }
        </div>
      </div>
    </div>
  )
}
