import React, { useState, useEffect } from 'react'
import './App.css'
import API from '../src/adapters/API'
import PictureCard from './components/PictureCard'
import SearchBar from './components/SearchBar'

const App = () => {
  const [pictures, setPictures] = useState([])
  const [loadMore, setLoad] = useState(false)
  const [currentTag, changeTag] = useState()
  const [search, toggleSearch] = useState(false)
  const [currentSearch, updateCurrentSearch] = useState('')

  const getData = () => {
    API.getPictures()
      .then(resp => {
        setPictures(pictures.concat(resp.items))
      })
  }

  const searchByTag = (tag) => {
    toggleSearch(true)
    updateCurrentSearch(tag)
    API.getTaggedPics(tag)
      .then(resp => {
        setPictures(resp.items)
      })
  }

  const searchMore = () => {
    API.getTaggedPics(currentSearch)
    .then(resp => {
      setPictures(pictures.concat(resp.items))
    })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (!loadMore) return
    if (!search) {
      getData()
    } else {
      searchMore()
    }
    setLoad(false)
  }, [loadMore])

  const checkLoad = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setLoad(true)
  }

  useEffect(() => {
    document.addEventListener('scroll', checkLoad)
    return function cleanup () {
      document.removeEventListener('scroll', checkLoad)
    };
  }, [])

  const taggedPics = !currentTag ? pictures : pictures.filter(p => (p.tags.split(' ').includes(currentTag)))
  const pics = taggedPics.filter(p => (p.title.length < 40 && p.author.length < 40))
                        

  return <>
          <div className={'search-bar'}>
          <SearchBar search={searchByTag} currentSearch={currentSearch}/>
          </div>
          <div className={'pictures-container'}>
              {pictures && pics.map(picture => {
              return <PictureCard {...picture} changeTag={changeTag} currentTag={currentTag}/>
           })}
          </div>
        </>
}

export default App
