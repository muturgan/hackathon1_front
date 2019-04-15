import React from "react";
import './Heart.css';

export const Heart = (props) => {
    let clazz = 'heart';
    clazz += props.likedByYou ? ' likebyyou' : '';
    clazz += props.likes ? '' : ' empty';
    return <div
        className={clazz}
        >
        
            ♥ <span>{props.likes || ''}</span>
    </div>;
};