import { useState, useEffect } from 'react'

export default function Meme(props) {
    return (
        <div className="meme">
            <img src={props.meme.url} className="img-fluid" alt="" />
            <h2 className="meme-heading top">{props.meme.topText}</h2>
            <h2 className="meme-heading bottom">{props.meme.bottomText}</h2>
        </div>
    );
}
