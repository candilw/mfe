import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

//Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    //onNavigate isn't provided in mount call below (just running subapp)
    if (onNavigate) {
        //This calls the on navigate function defined in the container MarketingApp.js mount
        history.listen(onNavigate);
    }

    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

    return {
        //Container will call this in history.listen
        onParentNavigate({pathname: nextPathname}) {
            const { pathname } = history.location;

            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
}

//If we are in development and in isolation,
//call mount immediate
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');

    if (devRoot) {
            mount(devRoot, { defaultHistory: createBrowserHistory()});
    }
}

//we are running through container
//and we should export the mount function
export  { mount };

