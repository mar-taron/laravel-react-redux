import React, {Component}  from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles/Home.scss'


const Home = () => {
    return (
        <div styleName="Home">
            <div styleName="TextContainer">
                <h2>Laravel / React Test application</h2>
            </div>
        </div>
    );
}

export default CSSModules(Home, styles)
