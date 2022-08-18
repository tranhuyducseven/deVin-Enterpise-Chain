import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom'
import HomeScreen from './screens/home'
import OrganizationScreen from './screens/organization'

export default function App() {
  return (
    <Routes>
      <Switch>
        <Route path="/organizations">
          <OrganizationScreen />
        </Route>
        <Route path="/">
          <HomeScreen />
        </Route>
      </Switch>
    </Routes>
  )
}
