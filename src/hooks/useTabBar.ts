import { useCallback, useContext } from 'react'
import { ITabBarStudent } from '../libs/model'
import { context } from './store'

export default function useTabBar () {
  const { tabBarList, setTabBarList, setTabBarId } = useContext(context)
  // 增加tabBar
  const addTabBar = useCallback((tabBar: ITabBarStudent) => {
    const index = tabBarList.findIndex(item => item.value === tabBar.value)
    if (index === -1) {
      setTabBarList([...tabBarList, tabBar])
      setTabBarId(tabBar.value)
    }
  },
  [tabBarList, setTabBarList]
  )

  // 删除tabBar
  const deleteTabBar = useCallback((tabBar: number) => {
    const index = tabBarList.findIndex(item => item.value === tabBar)
    if (index !== -1) {
      const newList = tabBarList.filter(item => item.value !== tabBar)
      setTabBarList(newList)
      setTabBarId(newList[newList.length - 1].value)
    }
  },
  [tabBarList, setTabBarList]
  )

  return {
    addTabBar,
    deleteTabBar
  }
}
