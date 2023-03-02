import { Button, Form, Input, InputNumber, message, Modal, Table, Tag, Upload } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import Column from 'antd/lib/table/Column'
import deleteIcon from '../../assets/imgs/delete.png'
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import style from './index.module.scss'
import { RcFile } from 'antd/lib/upload'
import { credential, getInfos, postBasic, postPdf } from '../../api/teacherApi/reimbursement'
import { IReimbersementState } from '../../libs/model'
import dayjs from 'dayjs'
import useFile from '../../hooks/useFile'
interface ITabel {
  key: string
  affair: string
  sum: number
  receipt: string
  material: string
  status: IReimbersementState
  time: string
}
export default function ReimbursementPart () {
  const [isModal, setModal] = useState(false)
  const [pdfMaterial, setPdfMaterial] = useState<RcFile>()
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<RcFile[]>([])
  const [total, setTotal] = useState<number>(0)
  const [infoList, setInfoList] = useState<ITabel[]>([])
  const [current, setCurrent] = useState(1)
  const { decode } = useFile()
  const [form] = useForm()

  const closeModal = () => {
    setPdfMaterial(undefined)
    setList([])
    form.resetFields()
    setModal(false)
  }

  const postLeave = async (values: any) => {
    if (!pdfMaterial) {
      message.info('请上传发发票pdf文件')
    } else {
      const res = await postBasic(values.affair, values.sum)
      if (res?.success) {
        const id = res.data
        const formData = new FormData()
        formData.append('file', pdfMaterial)
        const pdfRes = await postPdf(formData, id)
        if (pdfRes?.success) {
          if (list.length === 0) {
            closeModal()
            getInfo()
            message.success(pdfRes.msg)
          } else {
            const data = new FormData()
            list.forEach(item => data.append('file', item))
            const listRes = await credential(data, list.length, id)
            if (listRes?.success) {
              closeModal()
              getInfo()
              message.success(listRes.msg)
            }
          }
        }
      }
    }
  }

  const beforeUpload = (file: RcFile) => {
    const isTypeTrue = file.type === 'application/pdf'
    if (!isTypeTrue) {
      message.error(`${file.name} 文件只能为pptx、ppt、pdf、docx、doc格式`)
    } else {
      setPdfMaterial(file)
    }
    return isTypeTrue
  }

  const beforeUpload2 = (file: RcFile) => {
    const isTypeTrue = file.type === 'application/pdf' || file.type === 'image/png'
    const num = list.length
    if (num === 4) {
      message.info('最多上传四份文件')
    } else {
      if (!isTypeTrue) {
        message.error(`${file.name} 文件只能为pdf或者png格式`)
      } else {
        setList([file, ...list])
      }
    }
    return isTypeTrue && (num !== 4)
  }

  const deletePdfMaterial = () => {
    setPdfMaterial(undefined)
  }

  // 删除文件
  const deleteFile = (item: RcFile) => {
    setList(list.filter(file => file.uid !== item.uid))
  }

  // 刷新&&得到文件
  const getInfo = async () => {
    setLoading(true)
    const res = await getInfos(current, 8)
    if (res?.success) {
      setTotal(res.data.total)
      const temp: ITabel[] = res.data.applys.reduce((pre: ITabel[], cur) => {
        pre.push({
          key: cur.id,
          affair: cur.affairReason,
          sum: cur.amount,
          receipt: cur.invoice,
          material: cur.credential,
          status: cur.reimbursementState,
          time: dayjs(cur.createdTime).format('YYYY-MM-DD')
        })
        return pre
      }, [])
      setInfoList(temp)
      setLoading(false)
    }
  }

  // 处理材料
  const handleMaterial = (info: string) => {
    if (info) {
      return <div className={style.a_box}>
        {
          info.split(';')
            .map((url, index) =>
              <a href={url} key={index}
              >{decode(url, 'http://seach-chendian.oss-cn-hangzhou.aliyuncs.com/reimbursement/')}
              </a>
            )
        }
      </div>
    } else {
      return ''
    }
  }

  useEffect(() => {
    getInfo()
  }, [current])

  const paginationProps = {
    pageSize: 8,
    current,
    total,
    onChange: (pageNum: number) => {
      setCurrent(pageNum)
    }
  }

  // 状态
  const renderState = (state: IReimbersementState) => {
    switch (state) {
      case -1:
        return <Tag color='green'>审核中</Tag>
      case 0:
        return <Tag color='blue'>通过</Tag>
      case 1:
        return <Tag color='red'>拒绝</Tag>
    }
  }

  return (
    <div>
      <Button className={style.leave_btn} type='primary' onClick={() => setModal(true)}>报销申请</Button>
      <Table
        loading={loading}
        dataSource={infoList}
        pagination={paginationProps}
      >
        <Column title="具体事务" dataIndex="affair" key="affair" />
        <Column title="报销金额" dataIndex="sum" key="sum" />
        <Column
          title="发票"
          dataIndex="receipt"
          key="receipt"
          render={
            (url: string, _: any) => url
              ? <a href={url}
              >{decode(url, 'http://seach-chendian.oss-cn-hangzhou.aliyuncs.com/reimbursement/')}
              </a>
              : ''
          }
        />
        <Column
          title="相关证明材料"
          dataIndex="material"
          key="material"
          render={(url: string, _: any) => handleMaterial(url)}
        />
        <Column
          title="状态"
          dataIndex="status"
          key="status"
          render={(status: IReimbersementState, _: any) => renderState(status)}
        />
        <Column title="申请时间" dataIndex="time" key="time" />
      </Table>
      <Modal
        open={isModal}
        title='报销申请'
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form
          onFinish={postLeave}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          form={form}
        >
          <Form.Item
            label='具体事务'
            name='affair'
            rules={[
              { required: true, message: '具体事务不为空' },
              { max: 255, message: '不超过255字' }
            ]}
          >
            <Input.TextArea placeholder='请填写报销具体事务'></Input.TextArea>
          </Form.Item>
          <Form.Item
            label='报销金额'
            name='sum'
            rules={[
              { required: true, message: '报销金额不为空' }
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label='发票（pdf）'
            name='receipt'
          >
            <Upload
              showUploadList={false}
              beforeUpload={beforeUpload}
              accept='.pdf'
              customRequest={() => { }}
            >
              <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
            {
              pdfMaterial
                ? <div className={style.material_line_box}>
                  <div className={style.material}>{pdfMaterial.name}</div>
                  <img onClick={() => deletePdfMaterial()} src={deleteIcon} className={style.deleteIcon}></img>
                </div>
                : ''
            }
          </Form.Item>
          <Form.Item
            label='相关证明材料'
            name='material'
            extra="仅支持.pdf、png格式文件"
          >
            <Upload
              showUploadList={false}
              beforeUpload={beforeUpload2}
              accept='.pdf, .png'
              customRequest={() => { }}
            >
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
            <div className={style.list_box}>
              {
                list?.map((item, index) => <div key={index} className={style.list_line}>
                  <div className={style.list}>{item.name}</div>
                  <img src={deleteIcon} onClick={() => deleteFile(item)} className={style.deleteIcon}></img>
                </div>)
              }
            </div>
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
    </div>
  )
}
