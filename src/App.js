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
        setPictures([...pictures, resp.items])
      })
  }

  const getMore = () => {
    API.getPictures()
      .then(resp => {
        setPictures([...pictures, resp.items])
      })
  }

  useEffect(() => {
    getData()
  }, [pictures])

  useEffect(() => {
    setLoad(false)
    getMore()
  }, [loadMore, pictures])

  const checkLoad = () => {
    window.requestAnimationFrame(() => {
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrolled = window.pageYOffset
      const difference = docHeight + scrolled
      const percentage = difference / docHeight - 1
      if (percentage > 0.5) {
        setLoad(true)
      }
    })
  }

  useEffect(() => {
    document.addEventListener('scroll', () => checkLoad())
    return function cleanup () {
      document.removeEventListener('scroll', () => checkLoad())
    };
  })


  // useEffect(() => {
  //   const pictures = document.getElementById('pictures-container')
  //   if (props.scrollable) {
  //     pictures.addEventListener('scroll', (e) => {
  //       const el = e.target
  //       if (el.scrollTop + el.clientHeight === el.scrollHeight) {
  //         setLoad(true)
  //       }
  //     })  
  //   } 
  // }, [])

  return <div className={'pictures-container'}>
    {pictures && pictures.map(picture => {
      return <PictureCard {...picture} />
    })}
  </div>
}

export default App
