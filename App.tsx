import { useFonts } from 'expo-font'
import { QueryClient, QueryClientProvider } from 'react-query'


import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import Main from './src/Main'

export default function App() {
  const [isFontsLoaded] = useFonts({
    'GeneralSans-400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf'),
  })

  const queryClient = new QueryClient()

  if (!isFontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

