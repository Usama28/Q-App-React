import React, { useState } from 'react'

function switchButtonn(props) {
    console.log(props)

    return (
        <div>
            <button onClick={() => props.setOnstate(true)}>ON</button>
            <button onClick={() => props.setOffstate(true)}>OFF</button>
        </div>
    )
}

export default switchButtonn