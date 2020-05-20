import React, { useState, useEffect } from 'react';

export default function selectTypeUser({ option, handle }) {

    const setOption = (e) => handle(e.target.value)

    return (<select onChange={setOption} id="cars">
        <option value="none" selected>seletc a type</option>
        <option value="call">call</option>
        <option value="receiver">Receiver</option>
    </select>)

}



