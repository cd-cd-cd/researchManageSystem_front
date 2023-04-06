import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, DatePicker, Form, Input, Modal, Select, Table, Tag, message } from 'antd'
import { getSelf } from '../../../api/managerApi/info'
import { IResGeTInfo, IResGetSelf, getHistoryInfo, getInfo, getStuInfos, projectCreate, updateProject } from '../../../api/studentApi/project'
import { RangePickerProps } from 'antd/lib/date-picker'
import dayjs from 'dayjs'
import { IOption, IProgress, IProjectState, IUser } from '../../../libs/model'
import Column from 'antd/lib/table/Column'
import ProjectShow from '../../../components/ProjectSHow'

export default function Project () {
  const [loading, setLoading] = useState(false)
  const [infoList, setInfoList] = useState<IResGeTInfo[]>([])
  const [UpdateBasicInfo, setUpdateBasicInfo] = useState<IResGeTInfo>()
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  const [isModal, setIsModal] = useState(false)
  const [isModal2, setIsModal2] = useState(false)
  const [selfInfo, setSelfInfo] = useState<IResGetSelf>()
  const [option, setOption] = useState<IOption[]>()
  const [isProgress, setIsProgress] = useState(false)
  const [singleInfo, setSingleInfo] = useState<IResGeTInfo>()
  const [progressInfo, setProgressInfo] = useState<IProgress[]>()
  const getSelfInfo = async () => {
    const res = await getSelf()
    if (res?.success) {
      setSelfInfo(res.data)
    }
    const res2 = await getStuInfos()
    if (res2?.success) {
      setOption(res2.data)
    }
    setIsModal(true)
  }

  const getTableInfo = async () => {
    setLoading(true)
    const res = await getInfo()
    if (res?.success) {
      setInfoList(res.data)
      setLoading(false)
    }
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days after today and today
    return current && current < dayjs().endOf('day')
  }
  const closeModal = () => {
    form.resetFields()
    setIsModal(false)
  }

  const closeModal2 = () => {
    form2.resetFields()
    setIsModal2(false)
  }

  const createProject = async (values: any) => {
    const teammate = values.teammate.join(';')
    const res = await projectCreate(values.title, teammate, values.startTime, values.endTime)
    if (res?.success) {
      getTableInfo()
      closeModal()
    }
  }

  const updateProjectClick = async (values: any) => {
    if (UpdateBasicInfo) {
      const res = await updateProject(
        UpdateBasicInfo?.id,
        values.researchProgress,
        values.nextPlan,
        values.fundPlan,
        values.clarification
      )
      if (res?.success) {
        message.success(res.msg)
        closeModal2()
      }
    }
  }

  const renderState = (state: IProjectState) => {
    switch (state) {
      case -1:
        return <Tag color='green'>审核中</Tag>
      case 1:
        return <Tag color='red'>被驳回</Tag>
      case 0:
        return <Tag color='blue'>通过</Tag>
      case 2:
        return <Tag color='yellow'>已结项</Tag>
    }
  }

  const getHistoryInfoClick = async (id: string) => {
    const res = await getHistoryInfo(id)
    if (res?.success) {
      setProgressInfo(res.data)
    }
  }

  useEffect(() => {
    getTableInfo()
  }, [])
  return (
    <div>
      <Button className={style.btn} onClick={() => { getSelfInfo() }}>项目申报</Button>
      <Modal footer={null} open={isModal} onCancel={() => closeModal()}>
        <Form
          onFinish={createProject}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          form={form}
        >
          <Form.Item
            label='项目名称'
            name='title'
            rules={[
              { required: true, message: '项目名称不为空' },
              { max: 30, message: '项目名称不超过30字' }
            ]}
          >
            <Input placeholder='项目名称'></Input>
          </Form.Item>
          <Form.Item
            label='项目负责人'
          >
            {selfInfo?.name}
          </Form.Item>
          <Form.Item
            label='项目成员'
            name='teammate'
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="请选择项目成员"
              options={option}
            />
          </Form.Item>
          <Form.Item
            label='开始时间'
            name='startTime'
            rules={[
              { required: true, message: '开始时间不为空' }
            ]}
          >
            <DatePicker disabledDate={disabledDate}></DatePicker>
          </Form.Item>
          <Form.Item
            label='截止时间'
            name='endTime'
            rules={[
              { required: true, message: '截止时间不为空' }
            ]}
          >
            <DatePicker disabledDate={disabledDate}></DatePicker>
          </Form.Item>
          <Form.Item>
            <div className={style.btn_box}>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
              <Button htmlType="button" onClick={() => closeModal()}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        loading={loading}
        dataSource={infoList}
      >
        <Column title="项目名称" dataIndex="title" key="title" />
        <Column title="项目负责人" dataIndex='manager' key='manager' render={(value: IUser, _: any) => <span>{value.name}</span>} />
        <Column title="指导老师" dataIndex='teacherManager' key='teacherManager' render={(value: IUser, _: any) => <span>{value.name}</span>} />
        <Column title='项目成员' dataIndex='teammate' key='teammate' render={(value: IUser[], _: any) => value.map(item => <div key={item.id}>{item.name}</div>)}></Column>
        <Column title="项目状态" dataIndex='projectState' key='projectState' render={(value: IProjectState, _: any) => renderState(value)} />
        <Column title="开始时间" dataIndex='startTime' key='startTime' render={(value: Date, _: any) => dayjs(value).format('YYYY-MM-DD')} />
        <Column title="截止时间" dataIndex='endTime' key='endTime' render={(value: Date, _: any) => dayjs(value).format('YYYY-MM-DD')} />
        <Column
          title='操作'
          render={(_: any, record: IResGeTInfo) =>
            record.projectState === 0
              ? <div className={style.a_box}>
                <a onClick={() => { setUpdateBasicInfo(record); setIsModal2(true) }}>更新进度</a>
                <a onClick={() => { getHistoryInfoClick(record.id); setIsProgress(true); setSingleInfo(record) }}>查看进度</a>
              </div>
              : ''}></Column>
      </Table>
      <Modal
        width={700}
        footer={null}
        open={isModal2}
        onCancel={() => closeModal2()}
      >
        <Form
          layout="vertical"
          onFinish={updateProjectClick}
          form={form2}
        >
          <Form.Item
            label='项目名称'
            rules={[
              { required: true, message: '项目名称不为空' }
            ]}
          >
            {UpdateBasicInfo?.title}
          </Form.Item>
          <Form.Item
            label='研究工作进度及取得的主要阶段性成果'
            name='researchProgress'
            rules={[
              { required: true, message: '内容不为空' }
            ]}
          >
            <Input.TextArea placeholder='简要说明是否按计划进行，哪些研究内容根据国内外研究发展状况及项目进展情况做了必要的调整和变动，叙述所开展的研究工作、取得的进展或碰到的问题等'></Input.TextArea>
          </Form.Item>
          <Form.Item
            label='下一步研究计划'
            name='nextPlan'
            rules={[
              { required: true, message: '内容不为空' }
            ]}
          >
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item
            label='下阶段经费安排计划'
            name='fundPlan'
            rules={[
              { required: true, message: '内容不为空' }
            ]}
          >
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item
            label='存在问题、建议及需要说明的情况'
            name='clarification'
            rules={[
              { required: true, message: '内容不为空' }
            ]}
          >
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <div className={style.btn_box2}>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
              <Button htmlType="button" onClick={() => closeModal2()}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      {
        isProgress
          ? <ProjectShow setIsProgress={setIsProgress} singleInfo={singleInfo} progressInfo={progressInfo}></ProjectShow>
          : ''
      }
    </div>
  )
}
