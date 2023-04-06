import React, { useState } from 'react'
import style from './index.module.scss'
import bottomArraw from '../../../assets/imgs/bottom_arraw.png'
import dayjs from 'dayjs'
import { IProgress } from '../../../libs/model'

interface Props {
  info: IProgress
}

export default function ProjectItem ({ info }: Props) {
  const [isMore, setIsMore] = useState(false)
  return (
    <div>
      <img src={bottomArraw} className={style.arrow}></img>
      <div className={style.item}>
        {
          isMore
            ? <div className={style.moreDiv}>
              <a className={style.return} onClick={() => setIsMore(false)}>收起</a>
              <div className={style.smallDiv}>
                <div className={style.firstTitle}>研究工作进度及取得的主要阶段性成果</div>
                <div>{info.researchProgress}</div>
              </div>
              <div className={style.smallDiv}>
                <div className={style.firstTitle}>下一步研究计划</div>
                <div>{info.nextPlan}</div>
              </div>
              <div className={style.smallDiv}>
                <div className={style.firstTitle}>下阶段经费安排计划</div>
                <div>{info.fundPlan}</div>
              </div>
              <div className={style.smallDiv}>
                <div className={style.firstTitle}>存在问题、建议及需要说明的情况</div>
                <div>{info.clarification}</div>
              </div>
            </div>
            : <div>
              <span>更新日期：{dayjs(info.createdTime).format('YYYY-MM-DD')}</span>
              <a className={style.moreBtn} onClick={() => setIsMore(true)}>查看详情</a>
            </div>
        }
      </div>
    </div>
  )
}
