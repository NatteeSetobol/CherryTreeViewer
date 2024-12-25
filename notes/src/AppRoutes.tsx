import React from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './components/home'

const AppRoutes: React.FC<unknown> = (props) => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={ <Home /> }  />
            </Routes>
        </Router>
    );
}

export default AppRoutes;