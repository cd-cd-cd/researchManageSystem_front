import { useCallback, useContext } from 'react'
import { ItabBarStudent } from '../libs/model'
import { context } from './store'

export default function useTabBar () {
  const { tabBarList, setTabBarList } = useContext(context)
  // 增加tabBar
  const addTabBar = useCallback((tabBar: ItabBarStudent) => {
    const index = tabBarList.findIndex(item => item.value === tabBar.value)
    if (index === -1) {
      setTabBarList([...tabBarList, tabBar])
    }
  },
  [tabBarList, setTabBarList]
  )

  // 删除tabBar
  const deleteTabBar = (tabBar: string) => {
    return tabBarList.filter(item => item.value !== tabBar)
  }

  return {
    addTabBar,
    deleteTabBar
  }
}
