import { createContext } from 'react'
import { ItabBarStudent } from '../libs/model'

interface StoreContext {
// tabBar
  tabBarList: ItabBarStudent[]
  setTabBarList: (tabBar: ItabBarStudent[]) => void
}

const context = createContext<StoreContext>({
  tabBarList: [],
  setTabBarList: () => {}
})

const StoreProvider = context.Provider

export { context, StoreProvider }
