// import { Badge, Descriptions } from 'antd'
import { Button, DatePicker, Drawer, Form, Input, message, Modal, Pagination, Select, Tag } from 'antd'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { apply, applyInfo, cancelApply, getDevice, loadInfo } from '../../../api/studentApi/device'
import { IApplyInfo, ILoadInfo, IOption, typeIApplyState } from '../../../libs/model'
import NoInfoIcon from '../../../assets/imgs/noInfo.png'
import DeleteIcon from '../../../assets/imgs/delete.png'
import style from './index.module.scss'
import DeviceMsg from './DeviceMsg'

export default function DeviceManager () {
  const [open, setOpen] = useState(false)
  // 取消申请Modal
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  // 申请设备Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 保存待取消申请
  const [applyId, setApplyId] = useState<string>()
  // 可选设备列表
  const [option, setOption] = useState<IOption[]>()
  // 在借信息
  const [loads, setLoads] = useState<ILoadInfo[]>()
  // 申请信息列表
  const [infoList, setInfoList] = useState<IApplyInfo[]>()
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(4)
  const [form] = useForm()
  const closeModal = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  // 申请设备
  const applyDevice = async (values: any) => {
    const { serialNumber, reason, time } = values
    const startTime = time[0].toDate()
    const endTime = time[1].toDate()
    const res = await apply(serialNumber, reason, startTime, endTime)
    if (res?.status === 20003) {
      closeModal()
      getInfo()
      message.success(res.msg)
    } else if (res?.status === 20004) {
      message.info(res.msg)
    }
  }

  const getIdleDevice = async () => {
    const res = await getDevice()
    if (res?.status === 20002) {
      const newRes: IOption[] = res.data.reduce((pre: IOption[], cur) => {
        const temp: IOption = { value: cur.id, label: cur.name + ' - ' + cur.serialNumber }
        return [...pre, temp]
      }, [])
      setOption(newRes)
    }
    setIsModalOpen(true)
  }

  // 初始化列表
  const getInfo = async () => {
    const res = await applyInfo(current, 4)
    if (res?.status === 20010) {
      setTotal(res.data.total)
      setInfoList(res.data.applys)
    }
    getLoadInfo()
  }

  // 取消申请
  const cancelApplybtn = async () => {
    if (applyId) {
      const res = await cancelApply(applyId)
      if (res?.status === 20011) {
        setIsCancelModalOpen(false)
        getInfo()
        message.success(res.msg)
      }
    }
  }

  // 删除拒绝
  const deleteRefuse = async (id: string) => {
    const res = await cancelApply(id)
    if (res?.status === 20011) {
      setIsCancelModalOpen(false)
      getInfo()
      message.success('删除成功')
    }
  }

  const returnApllyState = (state: typeIApplyState, id: string) => {
    switch (state) {
      case 0:
        return <>
          <Tag color='#87d068'>申请中</Tag>
          <Tag color='#f50' style={{ cursor: 'pointer' }} onClick={() => { setIsCancelModalOpen(true); setApplyId(id) }}>取消申请</Tag>
        </>
      case 1:
        return <>
        <Tag color='#2db7f5'>已同意</Tag>
        <img src={DeleteIcon} className={style.delete} onClick={() => deleteRefuse(id)}></img>
        </>
      case -1:
        return <>
          <Tag color='#f50'>已拒绝</Tag>
          <img src={DeleteIcon} className={style.delete} onClick={() => deleteRefuse(id)}></img>
        </>
    }
  }

  // 获得在借信息
  const getLoadInfo = async () => {
    const res = await loadInfo()
    if (res?.success) {
      setLoads(res?.data)
    }
  }

  useEffect(() => {
    getInfo()
  }, [current])

  return (
    <div className={style.back}>
      <div className={style.btn_box}>
        <Button type='primary' className={style.apply_btn} onClick={() => getIdleDevice()}>设备申请</Button>
        <Button type='primary' className={style.store_btn} onClick={() => setOpen(true)}>在用设备</Button>
      </div>
      <div className={style.main}>
        {
          infoList?.map((item) => <div key={item.id}>
            <div className={style.show_box}>
              <div className={style.main_head}>
                {
                  returnApllyState(item.applyState, item.id)
                }
              </div>
              <div>
                <span className={style.label}>编号:</span>
                <span>{item.serialNumber}</span>
              </div>
              <div>
                <span className={style.label}>名称:</span>
                <span>{item.name}</span>
              </div>
              <div>
                <span className={style.label}>存放地:</span>
                <span>{item.address}</span>
              </div>
              <div className={style.index_box}>
                <span className={style.label}>设备性能指标:</span>
                <span>{item.performanceIndex}</span>
              </div>
              <div className={style.colOneToFour}>
                <span className={style.label}>申请期限:</span>
                <span>{`${dayjs(item.startTime).format('YYYY-MM-DD')} --- ${dayjs(item.endTime).format('YYYY-MM-DD')}`}</span>
              </div>
              <div className={style.colOneToFour}>
                <span className={style.label}>申请理由:</span>
                <span>{item.apply_reason ? item.apply_reason : '暂无'}</span>
              </div>
              <div className={style.colOneToFour}>
                <span className={style.label}>申请时间:</span>
                <span>{dayjs(item.createdTime).format('YYYY-MM-DD')}</span>
              </div>
              {
                item.applyState === -1
                  ? <div className={style.colOneToFour}>
                    <span className={style.label}>拒绝理由:</span>
                    <span>{item.refuseReason}</span>
                  </div>
                  : ''
              }
            </div>
          </div>)
        }
      </div>
      {
        infoList?.length === 0
          ? <div className={style.null_box}>
            <img src={NoInfoIcon} className={style.NoInfoIcon}></img>
            <span className={style.info_text}>暂无申请记录</span>
          </div>
          : ''
      }
      <Pagination
        defaultCurrent={current}
        total={total}
        onChange={(page) => setCurrent(page)}
        className={style.pagination_bottom}
      />
      <Modal
        title="设备申请"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          onFinish={applyDevice}
        >
          <Form.Item
            label='设备'
            name='serialNumber'
            rules={[
              { required: true, message: '设备不为空' }
            ]}
          >
            <Select
              style={{ width: '300px' }}
              placeholder="选择设备"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={option}
            ></Select>
          </Form.Item>
          <Form.Item
            label='申请时间'
            name='time'
            rules={[
              { required: true, message: '申请时间不为空' }
            ]}
          >
            <DatePicker.RangePicker style={{ width: '300px' }} />
          </Form.Item>
          <Form.Item
            name='reason'
            label='申请理由'
            rules={[
              { max: 255, message: '申请理由不超过255' }
            ]}
          >
            <Input.TextArea
              placeholder='申请理由'
            >
            </Input.TextArea>
          </Form.Item>
          <Form.Item>
            <div className={style.btn_box}>
              <Button type="primary" htmlType="submit">
                确认添加
              </Button>
              <Button htmlType="button" onClick={() => closeModal()}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="提醒"
        open={isCancelModalOpen}
        onOk={() => cancelApplybtn()}
        onCancel={() => { setIsCancelModalOpen(false); setApplyId('') }}
        okText='确认'
        cancelText='取消'
      >
        您确定要取消该申请吗
      </Modal>
      <Drawer
      title="在用设备"
      placement="right"
      onClose={() => setOpen(false)} open={open}
      width='600px'
      >
        {
          loads?.map(
            item => <div key={item.equipmentId}>
              <DeviceMsg item={item}></DeviceMsg>
          </div>
          )
        }
      </Drawer>
    </div>
  )
}
