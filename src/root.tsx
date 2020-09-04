import React, { Suspense } from 'react'
import { Router, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import Header from './components/header'
import history from './utils/history'

// import Child from './child'
// import Info from './info'

const Root = () => {
  return (
    <div>
      <Header title={'hello'} content={'root.js'} />
      <Suspense fallback={<div>Loading...</div>}>
        <Router history={history}>
          <Switch>
            {/* <Route exact path="/child" component={Child} /> */}
            {/* <Route path="/child/info" component={Info} /> */}
            {renderRoutes(routes)}
          </Switch>
        </Router>
      </Suspense>
    </div>
  )
}

export default Root
