import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import API from '../src/adapters/API'
import PictureCard from './components/PictureCard';

const App = () => {
  const [pictures, setPictures] = useState([])

  useEffect(() => {
    API.getPictures()
      .then(resp => setPictures(resp.items))
  }, [])

  

  return <div className={'pictures-container'}>
          {pictures && pictures.map(picture => {
            return <PictureCard {...picture} />
          })}
        </div>
}

export default App;
