import React from 'react'

const PictureCard = ({media, link, title, author, author_id, description, tags, changeTag, currentTag}) => {

  const address = "https://www.flickr.com/people/"
  const photo = media.m
  const name = author.split('"')

  const handleChange = (e) => {
    changeTag(e.target.value)
  }

  return <div className='picture-card'>
          <div className='image-container'>
          <img src={photo} className={'image'}/>
          </div>
          <div className="title-and-author">
            <a href={link}>{title}</a> by <a href={`${address}${author_id}`}>{name[1]} </a>
          </div>
          {/* <div className="description" dangerouslySetInnerHTML={{__html: `${description}`}}>
          </div> */}
          {tags && <select name="tags" className={"tags-dropdown"} onChange={handleChange}>
            <option value="">Tags:</option>
            {tags.split(" ").map(tag => {
              return <option value={tag} selected={tag === currentTag}>{tag}</option>
            })}
            </select>
          }
        </div>
}

export default PictureCard