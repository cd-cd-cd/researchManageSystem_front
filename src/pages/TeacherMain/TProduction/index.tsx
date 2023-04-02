import { Pagination, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { getInfo } from '../../../api/teacherApi/production'
import { NavItem } from '../../../libs/data'
import { IProduction, ITCopyright, ITPatent, ITProductionInfo, ITThesis, ITWin } from '../../../libs/model'
import style from './index.module.scss'
import TCopyRightTable from './Table/TCopyRightTable'
import TPatentTable from './Table/TPatentTable'
import THesisTable from './Table/TThesisTable'
import TWinTable from './Table/TWinTable'

export default function TProduction () {
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(100)
  const [loading, setLoading] = useState(false)
  const [nav, setNav] = useState<IProduction>('patent')
  const [dataSource, setDataSource] = useState<ITProductionInfo>()

  const renderTable = () => {
    switch (nav) {
      case 'patent':
        return <TPatentTable source={dataSource as ITPatent[]} loading={loading} getTableInfo={getTableInfo}></TPatentTable>
      case 'thesis':
        return <THesisTable source={dataSource as ITThesis[]} loading={loading} getTableInfo={getTableInfo}></THesisTable>
      case 'copyright':
        return <TCopyRightTable source={dataSource as ITCopyright[]} loading={loading} getTableInfo={getTableInfo}></TCopyRightTable>
      case 'winning':
        return <TWinTable source={dataSource as ITWin[]} loading={loading} getTableInfo={getTableInfo}></TWinTable>
    }
  }

  const getTableInfo = async () => {
    setLoading(true)
    const res = await getInfo(nav, current, 6)
    if (res?.success) {
      setTotal(res.data.total)
      setDataSource(res.data.infos)
      setLoading(false)
      console.log(dataSource)
    }
  }

  useEffect(() => {
    getTableInfo()
  }, [nav])
  return (
    <div>
      <Select
        className={style.select}
        style={{ width: '100px' }}
        showSearch
        defaultValue='patent'
        optionFilterProp="children"
        onChange={(value: IProduction) => setNav(value)}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={NavItem}
      />
      {renderTable()}
      <Pagination
        defaultCurrent={current}
        total={total}
        onChange={(page) => setCurrent(page)}
        className={style.pagination_bottom}
      />
    </div>
  )
}
