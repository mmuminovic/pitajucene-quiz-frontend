import React from 'react'

export default function HomeButton({ imageUrl, imageAlt, text }) {
    return (
        <div className="home-button">
            <img className="home-button__icon" src={imageUrl} alt={imageAlt} />
            <span className="home-button__text">{text}</span>
        </div>
    )
}
