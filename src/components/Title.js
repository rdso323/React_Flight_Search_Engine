import React, { Component } from 'react'

export class Title extends Component {
    render() {
        return (
            <div style = {header}>
                <h1>Flight Search Engine</h1>
            </div>
        )
    }
}

const header = {
    background: '#333',
    color: '#fff',
    textAlign: 'left',
    padding: '10px'
}
export default Title
