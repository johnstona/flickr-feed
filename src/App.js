import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import API from '../src/adapters/API'
import PictureCard from './components/PictureCard'

const App = () => {
  const [pictures, setPictures] = useState([])
  const [loadMore, setLoad] = useState(false)

  const getData = () => {
    API.getPictures()
      .then(resp => {
        setPictures(pictures.concat(resp.items))
      })
  }


  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (!loadMore) return
    getData()
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


  return <div className={'pictures-container'}>
    {pictures && pictures.map(picture => {
      return <PictureCard {...picture} />
    })}
  </div>
}

export default App
