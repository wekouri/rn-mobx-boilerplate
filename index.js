import { LogBox } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'mobx-persist'
import { Navigation } from 'react-native-navigation'
import { ignore } from './dev'
import { authRoot, registerScreens } from './src/screens/navigator'
import { authStore, uiStore } from './src/store'

LogBox.ignoreLogs(ignore)

async function hydrateStores() {
  const hydrate = create({ storage: AsyncStorage })
  Promise.all([hydrate('UIStore', uiStore), hydrate('AuthStore', authStore)])
}

Navigation.events().registerAppLaunchedListener(async () => {
  await hydrateStores()
  registerScreens()
  Navigation.setRoot(authRoot)
})
