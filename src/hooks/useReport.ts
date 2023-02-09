import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IPart } from '../libs/model'
export default function useReport () {
  const [report, setReport] = useState<IPart[]>([])
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
  const initReport = () => {
    const temp = [returnPart('progress'), returnPart('plan')]
    console.log(temp)
    setReport(temp)
  }

  const addPoint = (type: 'progress' | 'plan' | 'teamService') => {
    setReport([...report, returnPart(type)])
  }

  useEffect(() => {
    initReport()
    console.log('*')
  }, [])
  return {
    // addTeamPart,
    addPoint,
    report,
    initReport
  }
}
