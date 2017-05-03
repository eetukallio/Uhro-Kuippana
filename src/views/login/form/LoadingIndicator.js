/**
 * LoadingIndicator.react.js
 *
 * A loading indicator, copied from https://github.com/tobiasahlin/SpinKit
 *
 */

import React from 'react';
import './loadingButton.css';

// Since this component doesn't need any state, make it a stateless component
function LoadingIndicator() {
    return (
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
    )
}

export default LoadingIndicator;
