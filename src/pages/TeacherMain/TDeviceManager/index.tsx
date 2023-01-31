import { Button, DatePicker, Form, Input, Modal, Popconfirm, Table, Tag } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import Column from 'antd/lib/table/Column'
import React, { useState } from 'react'
import style from './index.module.scss'

type IState = 0 | -1 | 1
interface DataType {
  key: React.Key
  serialNumber: string
  name: string
  version: string
  originalValue: string
  performanceIndex: string
  address: string
  state: IState
  warehouseEntryTime: string
  recipient: string
  HostRemarks: string
  remark: string
}
const data: DataType[] = [
  {
    key: '1',
    serialNumber: '1807053N',
    name: 'GPU并行运算服务器',
    version: 'IW4200-4G',
    originalValue: '73829',
    performanceIndex: 'Lenovo P318，Intel Core i7-6700，3900 MHz，Samsung 250GB SSD+2TB，16GB内存， NVIDIA GTX 1080',
    address: '九教北604A',
    state: 0,
    warehouseEntryTime: '2018-07-16',
    recipient: '',
    HostRemarks: '包含2个显示器，均无设备编号，VGA接口，均为Lenovo 22英寸',
    remark: '北京华航创新科技有限责任公司/韦老师购置，挂宋亚男名下'
  },
  {
    key: '2',
    serialNumber: '1807053N',
    name: 'GPU并行运算服务器',
    version: 'IW4200-4G',
    originalValue: '73829',
    performanceIndex: 'Lenovo P318，Intel Core i7-6700，3900 MHz，Samsung 250GB SSD+2TB，16GB内存， NVIDIA GTX 1080',
    address: '九教北604A',
    state: -1,
    warehouseEntryTime: '2018-07-16',
    recipient: '',
    HostRemarks: '包含2个显示器，均无设备编号，VGA接口，均为Lenovo 22英寸',
    remark: '北京华航创新科技有限责任公司/韦老师购置，挂宋亚男名下'
  },
  {
    key: '3',
    serialNumber: '1807053N',
    name: 'GPU并行运算服务器',
    version: 'IW4200-4G',
    originalValue: '73829',
    performanceIndex: 'Lenovo P318，Intel Core i7-6700，3900 MHz，Samsung 250GB SSD+2TB，16GB内存， NVIDIA GTX 1080',
    address: '九教北604A',
    state: 1,
    warehouseEntryTime: '2018-07-16',
    recipient: '贾添植',
    HostRemarks: '包含2个显示器，均无设备编号，VGA接口，均为Lenovo 22英寸',
    remark: '北京华航创新科技有限责任公司/韦老师购置，挂宋亚男名下'
  },
  {
    key: '4',
    serialNumber: '1807053N',
    name: 'GPU并行运算服务器',
    version: 'IW4200-4G',
    originalValue: '73829',
    performanceIndex: 'Lenovo P318，Intel Core i7-6700，3900 MHz，Samsung 250GB SSD+2TB，16GB内存， NVIDIA GTX 1080',
    address: '九教北604A',
    state: 1,
    warehouseEntryTime: '2018-07-16',
    recipient: '贾添植',
    HostRemarks: '包含2个显示器，均无设备编号，VGA接口，均为Lenovo 22英寸',
    remark: '北京华航创新科技有限责任公司/韦老师购置，挂宋亚男名下'
  }
]
export default function TDeviceManager () {
  // 添加设备Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  // 添加设备form
  const [form] = useForm()
  const onSearch = (value: string) => {
    console.log(value)
  }

  const closeModal = () => {
    form.resetFields()
    setIsAddModalOpen(false)
  }

  const toggleState = (state: IState) => {
    console.log(state)
  }

  // 收回设备
  const recoveryEquipment = () => {
    console.log('收回')
  }

  // 设备状态
  const returnState = (state: IState) => {
    switch (state) {
      case 0:
        return <Popconfirm
          title="点击确定将此设备设置为损坏状态"
          onConfirm={() => toggleState(0)}
          okText="确定"
          cancelText="取消"
        >
          <Tag color="green" style={{ cursor: 'pointer' }}>空闲</Tag>
        </Popconfirm>
      case -1:
        return <Popconfirm
          title="点击确定将此设备设置为空闲状态"
          onConfirm={() => toggleState(-1)}
          okText="确定"
          cancelText="取消"
        ><Tag color="red" style={{ cursor: 'pointer' }}>损坏</Tag>
        </Popconfirm>
      case 1:
        return <Tag color="blue">在用</Tag>
    }
  }

  // 领用人部分
  const returnRecipient = (user: string, state: IState) => {
    if (!user && state === 0) {
      return <a>指派设备</a>
    } else {
      return <Popconfirm
        title="点击确定将收回此设备"
        onConfirm={() => recoveryEquipment()}
        okText="确定"
        cancelText="取消"
      >
        <span className={style.name}>{user}</span>
      </Popconfirm>
    }
  }
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
        dataSource={data}
        className={style.height}
      // loading={true}
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
          render={(value: IState, _) => returnState(value)}
        />
        <Column title="入库日期" dataIndex="warehouseEntryTime" key="warehouseEntryTime" />
        <Column title="领用人"
          dataIndex="recipient"
          key="recipient"
          render={(value: string, record: DataType) => returnRecipient(value, record.state)}
        />
        <Column title="主机备注" dataIndex="HostRemarks" key="HostRemarks" />
        <Column title="备注" dataIndex="remark" key="remark" />
        <Column
          title="操作"
          key="action"
          render={(_: any, record: DataType) => (
            <a>修改</a>
          )}
        />
      </Table>
      <Modal title="添加设备"
        style={{ width: '600px' }}
        open={isAddModalOpen}
        footer={null}
        onCancel={() => closeModal()}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          form={form}>
          <Form.Item
            name='serialNumber'
            label='编号'
            rules={[{ required: true, message: '设备编号不为空' }]}
          >
            <Input placeholder='设备编号'></Input>
          </Form.Item>
          <Form.Item
            name='name'
            label='名称'
            rules={[{ required: true, message: '设备名称不为空' }]}
          >
            <Input placeholder='设备名称'></Input>
          </Form.Item>
          <Form.Item
            name='version'
            label='型号'
            rules={[{ required: true, message: '设备型号不为空' }]}
          >
            <Input placeholder='设备型号'></Input>
          </Form.Item>
          <Form.Item
            name='originalValue'
            label='原值'
            rules={[{ required: true, message: '设备原值不为空' }]}
          >
            <Input placeholder='设备原值'></Input>
          </Form.Item>
          <Form.Item
            name='performanceIndex'
            label='设备性能指标'
            rules={[{ required: true, message: '设备性能指标不为空' }]}
          >
            <Input placeholder='设备性能指标'></Input>
          </Form.Item>
          <Form.Item
            name='address'
            label='存放地'
            rules={[{ max: 50, message: '地址长度不超过50' }]}
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
            <Input.TextArea placeholder='如果设备为主机可进行备注'></Input.TextArea>
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
      <Modal title='修改设备'>
      </Modal>
    </div>
  )
}
