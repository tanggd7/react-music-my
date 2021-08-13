import MyHeader from './components/my-header/my-header'
import Tab from './components/tab/tab'
import Recommend from './components/recommend/recommend'
import { Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <MyHeader />
      <Tab />

      <Switch>
        <Route path="/recommend" component={Recommend}></Route>
        <Route path="/singer" component={Recommend}></Route>
        <Route path="/rank" component={Recommend}></Route>
        <Route path="/search" component={Recommend}></Route>
      </Switch>
    </div>
  )
}

export default App
