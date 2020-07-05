import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import StreamViewer from '../pages/StreamViewer';
import Routes from '../Routes';
import _Layout from '../pages/_Layout';
import EntryViewer from '../pages/EntryViewer';
import { makeStyles } from '@material-ui/core';

const duration = 0.3;
const timeout = {
    enter: duration*1000,
    exit: duration*1000
};

const useStyles = makeStyles(theme => ({
    '@global': {
        '.page': {
            transition: `transform ${duration}s cubic-bezier(0.790, 0.005, 0.270, 1.195)`,
            height: 'calc(100vh - 48px)',
            width: '100vw',
            position: 'fixed',
            top: '48px',
            overflowY: 'auto',
            overflowX: 'hidden'
        },
        '.page.enter': {
            transform: 'translate(100%, 0)'
        },
        '.page.exit': {
            transform: 'translate(-100%, 0)',
            zIndex: 1000
        },
        '.page.enter-active': {
            transform: 'translate(0,0)'
        }

        // '.page--prev.enter': {
        //     transform: 'translate(-100%, 0)'
        // },
    }
}));

export default (props) => {
    useStyles();

    return <Route render={({ location }) => {
        return <TransitionGroup>
            <CSSTransition
                timeout={timeout}
                key={location.key as any}>
                    <Switch location={location}>
                        {Routes}
                    </Switch>
            </CSSTransition>
        </TransitionGroup>
    }}/>
}