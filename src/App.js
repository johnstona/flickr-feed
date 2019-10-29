import React, { useState, useEffect } from 'react'
import './App.css'
import API from '../src/adapters/API'
import SearchBar from './components/SearchBar'
import PicturesContainer from './containers/PicturesContainer'

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
    setPictures([])
    toggleSearch(true)
    updateCurrentSearch(tag)
    window.scrollTo(0, 0)
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
          <SearchBar search={searchByTag} currentSearch={currentSearch} />
          <PicturesContainer pictures={pics} changeTag={changeTag} currentTag={currentTag} />
        </>
}

export default App
