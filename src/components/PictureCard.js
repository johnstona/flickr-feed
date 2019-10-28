import React from 'react'

const PictureCard = ({media, link, title, author, author_id, description, tags}) => {

  const address = "www.flickr.com/people/"
  const photo = media.m
  const name = author.split('"')
  console.log(name)

  return <div className='picture-card'>
          <img src={photo} className={'image'}/>
          <div className="title-and-author">
            <a href={link}>{title}</a> by <a href={`${address}${author_id}`}>{name[1]} </a>
          </div>
          {/* <div className="description" dangerouslySetInnerHTML={{__html: `${description}`}}>
          </div> */}
        </div>
}

export default PictureCard