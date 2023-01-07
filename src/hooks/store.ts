import { createContext } from 'react'
import { ITabBarStudent } from '../libs/model'

interface StoreContext {
// tabBar
  tabBarList: ITabBarStudent[]
  setTabBarList: (tabBar: ITabBarStudent[]) => void

  // tabBarId
  tabBarId: number
  setTabBarId: (id: number) => void
}

const context = createContext<StoreContext>({
  tabBarList: [],
  setTabBarList: () => {},
  tabBarId: -1,
  setTabBarId: () => {}
})

const StoreProvider = context.Provider

export { context, StoreProvider }
