import { Button, DatePicker, Descriptions, Drawer, Form, Input, message, Modal, Popconfirm, Select, Space, Table, Tag } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { addDevice, changeState, chooseStu, getList, getLists, recoveryDevice, updateDeviceInfo } from '../../../api/teacherApi/device'
import { IDevice, IEquipmentState, IOption } from '../../../libs/model'
import style from './index.module.scss'

export default function TDeviceManager () {
  // 控制抽屉
  const [open, setOpen] = useState(false)
  // 保存学生列表
  const [stuList, setStuList] = useState<IOption[]>()
  // 指派时保存信息
  const [record, setRecord] = useState<IDevice>()
  // 保存指派人
  const [person, setPerson] = useState<string>()
  // 保存指派时间
  const [time, setTime] = useState<Date[]>()
  // 添加设备Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  // 修改设备Modal
  const [isModify, setIsModify] = useState(false)
  // 分页
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(10)
  const [loading, setLoading] = useState(true)
  // 保存修改id
  const [changeId, setChangeId] = useState<string>('')

  // 储存设备信息列表
  const [lists, setLists] = useState<IDevice[]>()
  // 添加设备form
  const [form] = useForm()
  const [modifyForm] = useForm()
  const onSearch = (value: string) => {
    console.log(value)
  }
  // 关闭添加Modal
  const closeModal = () => {
    form.resetFields()
    setIsAddModalOpen(false)
  }

  // 关闭修改Modal
  const closeModify = () => {
    form.resetFields()
    setIsModify(false)
  }

  const openModify = (record: IDevice) => {
    const newRecord = { ...record, warehouseEntryTime: moment(record.warehouseEntryTime) }
    modifyForm.setFieldsValue(newRecord)
    setChangeId(record.id)
    setIsModify(true)
  }

  const toggleState = async (state: IEquipmentState, id: string) => {
    const res = await changeState(state, id)
    if (res?.status === 10114) {
      getDeviceList()
      message.success(res.msg)
    }
  }

  // 收回设备
  const recoveryEquipment = async (record: IDevice) => {
    const res = await recoveryDevice(record.serialNumber)
    if (res?.status === 10117) {
      getDeviceList()
      message.success(res.msg)
    }
  }

  // 设备状态
  const returnState = (state: IEquipmentState, id: string) => {
    switch (state) {
      case 0:
        return <Popconfirm
          title="点击确定将此设备设置为损坏状态"
          onConfirm={() => toggleState(0, id)}
          okText="确定"
          cancelText="取消"
        >
          <Tag color="green" style={{ cursor: 'pointer' }}>空闲</Tag>
        </Popconfirm>
      case -1:
        return <Popconfirm
          title="点击确定将此设备设置为空闲状态"
          onConfirm={() => toggleState(-1, id)}
          okText="确定"
          cancelText="取消"
        ><Tag color="red" style={{ cursor: 'pointer' }}>损坏</Tag>
        </Popconfirm>
      case 1:
        return <Tag color="blue">在用</Tag>
    }
  }

  // 打开抽屉
  const clickOpenDraw = async (record: IDevice) => {
    const res = await getLists()
    if (res?.data) {
      const tempOption: IOption[] = res?.data.reduce((pre: IOption[], cur) => {
        const temp = { value: cur.id, label: `${cur.name}-${cur.username}` }
        return [...pre, temp]
      }, [])
      setStuList(tempOption)
      setOpen(true)
      setRecord(record)
    }
  }

  // 领用人部分
  const returnRecipient = (user: string, record: IDevice) => {
    if (!user && record.state === 0) {
      return <a onClick={() => clickOpenDraw(record)}>指派设备</a>
    } else {
      return <Popconfirm
        title="点击确定将收回此设备"
        onConfirm={() => recoveryEquipment(record)}
        okText="确定"
        cancelText="取消"
      >
        <span className={style.name}>{user}</span>
      </Popconfirm>
    }
  }

  // 添加设备
  const addEquipment = async (Value: IDevice) => {
    const res = await addDevice(
      Value.serialNumber,
      Value.name,
      Value.version,
      Value.originalValue,
      Value.performanceIndex,
      Value.address,
      Value.warehouseEntryTime,
      Value.HostRemarks,
      Value.remark
    )
    if (res?.status === 10110) {
      closeModal()
      getDeviceList()
      message.success(res.msg)
    } else if (res?.status === 10111) {
      message.info(res.msg)
    }
  }

  // 提交修改
  const modifySubmit = async (values: IDevice) => {
    const res = await updateDeviceInfo(
      changeId,
      values.serialNumber,
      values.name,
      values.version,
      values.originalValue,
      values.performanceIndex,
      values.address,
      values.warehouseEntryTime,
      values.HostRemarks,
      values.remark
    )
    if (res?.status === 10113) {
      closeModify()
      getDeviceList()
      message.success(res.msg)
    } else if (res?.status === 10118) {
      message.info(res.msg)
    }
  }

  // 表格分页属性
  const paginationProps = {
    pageSize: 4,
    current,
    total,
    onChange: (pageNum: number) => {
      setCurrent(pageNum)
    }
  }

  // 刷新
  const getDeviceList = async () => {
    setLoading(true)
    const res = await getList(current, 4)
    if (res?.status === 10112) {
      const { total, lists } = res.data
      setTotal(total)
      const newList = lists.map(item => {
        item.key = item.id
        item.warehouseEntryTime = dayjs(item.warehouseEntryTime).format('YYYY-MM-DD')
        return item
      })
      setLists(newList)
      setLoading(false)
    }
  }

  // 选择指派人
  const choosePerson = async () => {
    if (!record?.id) {
      message.info('请选择指派设备')
    } else if (!person) {
      message.info('选择指派人')
    } else if (time?.length !== 2) {
      message.info('请选择时间')
    } else {
      const res = await chooseStu(person, record.id, time[0], time[1])
      message.success(res?.msg)
      getDeviceList()
      setOpen(false)
      setTime([])
    }
  }

  // // 保存时间
  // const setStartAndEndTime = (values: Array<moment.Moment>, formatString: [string, string]) => {
  //   console.log(e)
  // }

  useEffect(() => {
    getDeviceList()
  }, [current])
  return (
    <div>
      <div className={style.func_box}>
        <Input.Search
          placeholder="请输入设备型号"
          allowClear onSearch={onSearch}
          className={style.searchInput}
        />
        <div className={style.apply_box}>
          审批申请
          <div className={style.apply_num}>12</div>
        </div>
        <Button type='primary' className={style.add_box} onClick={() => setIsAddModalOpen(true)}>添加设备</Button>
      </div>
      <Table
        dataSource={lists}
        className={style.height}
        pagination={paginationProps}
        loading={loading}
      >
        <Column title="编号" dataIndex="serialNumber" key="serialNumber" />
        <Column title="名称" dataIndex="name" key="name" />
        <Column title="型号" dataIndex="version" key="version" />
        <Column title="原值" dataIndex="originalValue" key="originalValue" />
        <Column title="设备性能指标" dataIndex="performanceIndex" key="performanceIndex" />
        <Column title="存放地" dataIndex="address" key="address" />
        <Column title="现状"
          dataIndex="state"
          key="state"
          render={(value: IEquipmentState, record: IDevice) => returnState(value, record.id)}
        />
        <Column title="入库日期" dataIndex="warehouseEntryTime" key="warehouseEntryTime" />
        <Column title="领用人"
          dataIndex="recipient"
          key="recipient"
          render={(value: string, record: IDevice) => returnRecipient(value, record)}
        />
        <Column title="主机备注" dataIndex="HostRemarks" key="HostRemarks" />
        <Column title="备注" dataIndex="remark" key="remark" />
        <Column
          title="操作"
          key="action"
          render={(_: any, record: IDevice) => (
            <a onClick={() => openModify(record)}>修改</a>
          )}
        />
      </Table>
      <Modal title="添加设备"
        forceRender
        style={{ width: '600px' }}
        open={isAddModalOpen}
        footer={null}
        onCancel={() => closeModal()}>
        <Form
          onFinish={addEquipment}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          form={form}>
          <Form.Item
            name='serialNumber'
            label='编号'
            rules={[
              { required: true, message: '设备编号不为空' },
              { max: 50, message: '编号长度不超过50' }
            ]}
          >
            <Input placeholder='设备编号'></Input>
          </Form.Item>
          <Form.Item
            name='name'
            label='名称'
            rules={[
              { required: true, message: '设备名称不为空' },
              { max: 50, message: '设备名称长度不超过50' }
            ]}
          >
            <Input placeholder='设备名称'></Input>
          </Form.Item>
          <Form.Item
            name='version'
            label='型号'
            rules={[
              { required: true, message: '设备型号不为空' },
              { max: 50, message: '型号长度不超过50' }
            ]}
          >
            <Input placeholder='设备型号'></Input>
          </Form.Item>
          <Form.Item
            name='originalValue'
            label='原值'
            rules={[
              { required: true, message: '设备原值不为空' },
              { max: 50, message: '原值长度不超过50' }
            ]}
          >
            <Input placeholder='设备原值'></Input>
          </Form.Item>
          <Form.Item
            name='performanceIndex'
            label='设备性能指标'
            rules={[
              { max: 255, message: '设备性能指标描述不超过255' }
            ]}
          >
            <Input.TextArea placeholder='设备性能指标'></Input.TextArea>
          </Form.Item>
          <Form.Item
            name='address'
            label='存放地'
            rules={[
              { max: 50, message: '地址长度不超过50' }
            ]}
          >
            <Input placeholder='设备存放地'></Input>
          </Form.Item>
          <Form.Item
            name='warehouseEntryTime'
            label='入库时间'
            rules={[{ required: true, message: '设备入库时间不为空' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name='HostRemarks'
            label='主机备注'
            rules={[{ max: 255, message: '主机备注长度不超过255' }]}
          >
            <Input.TextArea placeholder='如设备为主机，那么备注显示器，包含几个显示器，设备编号、显示器接口、显示器尺寸'></Input.TextArea>
          </Form.Item>
          <Form.Item
            name='remark'
            label='备注'
            rules={[{ max: 255, message: '备注长度不超过255' }]}
          >
            <Input.TextArea placeholder='设备备注'></Input.TextArea>
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
        title="修改设备"
        forceRender
        style={{ width: '650px' }}
        open={isModify}
        footer={null}
        onCancel={() => closeModify()}>
        <Form
          onFinish={modifySubmit}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          form={modifyForm}>
          <Form.Item
            name='serialNumber'
            label='编号'
            rules={[
              { required: true, message: '设备编号不为空' },
              { max: 50, message: '编号长度不超过50' }
            ]}
          >
            <Input placeholder='设备编号'></Input>
          </Form.Item>
          <Form.Item
            name='name'
            label='名称'
            rules={[
              { required: true, message: '设备名称不为空' },
              { max: 50, message: '设备名称长度不超过50' }
            ]}
          >
            <Input placeholder='设备名称'></Input>
          </Form.Item>
          <Form.Item
            name='version'
            label='型号'
            rules={[
              { required: true, message: '设备型号不为空' },
              { max: 50, message: '型号长度不超过50' }
            ]}
          >
            <Input placeholder='设备型号'></Input>
          </Form.Item>
          <Form.Item
            name='originalValue'
            label='原值'
            rules={[
              { required: true, message: '设备原值不为空' },
              { max: 50, message: '原值长度不超过50' }
            ]}
          >
            <Input placeholder='设备原值'></Input>
          </Form.Item>
          <Form.Item
            name='performanceIndex'
            label='设备性能指标'
            rules={[
              { max: 255, message: '设备性能指标描述不超过255' }
            ]}
          >
            <Input.TextArea placeholder='设备性能指标'></Input.TextArea>
          </Form.Item>
          <Form.Item
            name='address'
            label='存放地'
            rules={[
              { max: 50, message: '地址长度不超过50' }
            ]}
          >
            <Input placeholder='设备存放地'></Input>
          </Form.Item>
          <Form.Item
            name='warehouseEntryTime'
            label='入库时间'
            rules={[{ required: true, message: '设备入库时间不为空' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name='HostRemarks'
            label='主机备注'
            rules={[{ max: 255, message: '主机备注长度不超过255' }]}
          >
            <Input.TextArea placeholder='如设备为主机，那么备注显示器，包含几个显示器，设备编号、显示器接口、显示器尺寸'></Input.TextArea>
          </Form.Item>
          <Form.Item
            name='remark'
            label='备注'
            rules={[{ max: 255, message: '备注长度不超过255' }]}
          >
            <Input.TextArea placeholder='设备备注'></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <div className={style.btn_box}>
              <Button type="primary" htmlType="submit">
                确认修改
              </Button>
              <Button htmlType="button" onClick={() => closeModify()}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        title="选择指派人"
        placement='right'
        width={550}
        onClose={() => setOpen(false)}
        open={open}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button type="primary" onClick={() => choosePerson()}>
              确定
            </Button>
          </Space>
        }
      >
        <Descriptions title="设备信息">
          <Descriptions.Item label="编号">{record?.serialNumber}</Descriptions.Item>
          <Descriptions.Item label="名称">{record?.name}</Descriptions.Item>
          <Descriptions.Item label="型号">{record?.version}</Descriptions.Item>
          <Descriptions.Item label="原值">{record?.originalValue}</Descriptions.Item>
          <Descriptions.Item label="存放地">{record?.address}</Descriptions.Item>
          <Descriptions.Item label="入库日期">{dayjs(record?.warehouseEntryTime).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="设备性能指标">{record?.performanceIndex ? record.performanceIndex : '暂无'}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="选择指派人">
          <Descriptions.Item>
            <Select
              style={{ width: '200px' }}
              showSearch
              placeholder="选择指派人"
              optionFilterProp="children"
              onChange={(value: string) => setPerson(value)}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={stuList}
            />
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="使用时间">
          <Descriptions.Item>
            <DatePicker.RangePicker onChange={e => {
              if (e) {
                if (e[0] && e[1]) {
                  setTime([e[0].toDate(), e[1].toDate()])
                }
              }
            }}></DatePicker.RangePicker>
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </div>
  )
}
