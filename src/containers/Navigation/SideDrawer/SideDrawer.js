import React from 'react';

import classes from './SideDrawer.module.css';
import Backdrop from '../../Backdrop/Backdrop';
import Navigation from '../Navigation';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <div>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                {/* <div className={classes.Logo}>
                    <Logo />
                </div> */}
                <nav>
                    <Navigation />
                </nav>
            </div>
        </div>
    );
};

export default sideDrawer;