import React from 'react'

const HomeButton = ({ imageUrl, imageAlt, text, onClick }) => {
    return (
        <div className="home-button" onClick={onClick}>
            <img className="home-button__icon" src={imageUrl} alt={imageAlt} />
            <span className="home-button__text">{text}</span>
        </div>
    )
}

export default HomeButton
