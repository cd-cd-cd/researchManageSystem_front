import { message } from 'antd'
import { useCallback, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { context } from './store'
import { Moment } from 'moment'
export default function useReport () {
  const { report, setReport } = useContext(context)
  const returnPoint = (type: 'progress' | 'plan' | 'teamService') => {
    switch (type) {
      case 'progress':
        return [
          {
            id: uuidv4(),
            title: '进展简介',
            text: [
              {
                id: uuidv4(),
                content: ''
              }
            ]
          },
          {
            id: uuidv4(),
            title: '量化结果',
            text: [
              {
                id: uuidv4(),
                content: ''
              }
            ]
          }
        ]
      case 'plan':
        return [
          {
            id: uuidv4(),
            title: '任务设想',
            text: [
              {
                id: uuidv4(),
                content: ''
              }
            ]
          },
          {
            id: uuidv4(),
            title: '预期量化结果',
            text: [
              {
                id: uuidv4(),
                content: ''
              }
            ]
          }
        ]
      case 'teamService':
        return [
          {
            id: uuidv4(),
            title: '任务介绍',
            text: [
              {
                id: uuidv4(),
                content: ''
              }
            ]
          },
          {
            id: uuidv4(),
            title: '量化结果',
            text: [
              {
                id: uuidv4(),
                content: ''
              }
            ]
          }
        ]
    }
  }
  const returnPart = (type: 'progress' | 'plan' | 'teamService') => {
    const newPart = {
      type,
      id: uuidv4(),
      title: '',
      point: returnPoint(type)
    }
    return newPart
  }

  // 重置
  const reset = () => {
    setReport([returnPart('progress'), returnPart('plan')])
  }

  // 增加每个板块的内容
  const addPoint = (type: 'progress' | 'plan' | 'teamService') => {
    setReport([...report, returnPart(type)])
  }

  // 删除point
  const deletePoint = useCallback((id: string) => {
    setReport(report.filter(item => item.id !== id))
  }, [report, setReport])

  // 增加条数
  const addText = useCallback((id: string, pointId: string) => {
    const newText = {
      id: uuidv4(),
      content: ''
    }
    const temp = report.map(part => {
      if (part.id === id) {
        part.point.map(point => {
          if (point.id === pointId) {
            point.text.push(newText)
          }
          return point
        })
      }
      return part
    })
    setReport(temp)
  }, [report, setReport])

  // 删除条数
  const deleteText = useCallback((id: string, pointId: string, textId: string) => {
    report.forEach(part => {
      if (part.id === id) {
        part.point.forEach(point => {
          if (pointId === point.id) {
            point.text.forEach((text, index, arr) => {
              if (text.id === textId) {
                arr.splice(index, 1)
              }
            })
          }
        })
      }
    })
    setReport(JSON.parse(JSON.stringify(report)))
  }, [report, setReport])

  // 修改标题
  const changeTitle = useCallback((id: string, value: string) => {
    setReport(report.map(part => {
      if (part.id === id) {
        part.title = value
      }
      return part
    }))
  }, [report, setReport])

  // 修改条
  const changeText = useCallback((id: string, pointId: string, textId: string, value: string) => {
    report.forEach(part => {
      if (part.id === id) {
        part.point.forEach(point => {
          if (pointId === point.id) {
            point.text.forEach((text, index, arr) => {
              if (text.id === textId) {
                arr.splice(index, 1, { ...text, content: value })
              }
            })
          }
        })
      }
    })
    setReport(JSON.parse(JSON.stringify(report)))
  }, [report, setReport])

  // 检查周报
  const checkReport = (time: Moment[]) => {
    if (time.length === 0) {
      message.info('周报时间不为空')
      document.getElementById('time')?.scrollIntoView(true)
      return false
    }
    for (const part of report) {
      if (!part.title) {
        message.info('标题不为空')
        document.getElementById(part.id)?.scrollIntoView(true)
        return part.id
      } else {
        for (const point of part.point) {
          for (const text of point.text) {
            if (!text.content) {
              message.info('内容不为空')
              document.getElementById(part.id)?.scrollIntoView(true)
              return part.id
            }
          }
        }
      }
    }
    return true
  }
  return {
    addPoint,
    deletePoint,
    addText,
    deleteText,
    changeTitle,
    changeText,
    checkReport,
    reset
  }
}
