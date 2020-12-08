import React, { PureComponent } from 'react'
import {BrowserRouter as RouterPage, Switch, Route} from 'react-router-dom'
import LandingPage from './Main_Components/LandingPage'

export default class Router extends PureComponent {
    render() {
        return (
            <div id='router-page'>
                <RouterPage>
                    <Switch>
                        <Route path='/' exact render={(props)=><LandingPage {...props}/>}/>
                    </Switch>
                </RouterPage>
            </div>
        )
    }
}
