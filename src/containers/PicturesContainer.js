import React from 'react'
import PictureCard from '../components/PictureCard'

const PicturesContainer = ({pictures, changeTag, currentTag}) => {

  return <div className={'pictures-container'}>
            {pictures.map(picture => {
            return <PictureCard {...picture} changeTag={changeTag} currentTag={currentTag}/>
            })}
        </div>

}

export default PicturesContainer