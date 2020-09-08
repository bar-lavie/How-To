import React, { Component } from 'react';

export default class Layout extends Component {
    render() {
        return (
            <div className={`overflow-hidden relative ${!isHowtoFront ? "is-admin" : ""}`}>
                {this.props.children}
            </div>
        )
    }
}
