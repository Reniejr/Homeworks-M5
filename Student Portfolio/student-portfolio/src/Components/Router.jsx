import React, { PureComponent } from 'react'
import {BrowserRouter as RouterPage, Switch, Route} from 'react-router-dom'
import LandingPage from './Main_Components/LandingPage'
import Registration from './Sub_Components/Registration'
import './General_Styles/Router.scss'
import Home from './Main_Components/Home'

export default class Router extends PureComponent {
    render() {
        return (
            <div id='router-page'>
                <RouterPage>
                    <Switch>
                        <Route path='/' exact render={(props)=><LandingPage {...props}/>}/>
                        <Route path='/registration' exact render={(props)=><Registration {...props}/>}/>
                        <Route path='/home/:id' exact render={(props)=><Home {...props}/>}/>
                    </Switch>
                </RouterPage>
            </div>
        )
    }
}
