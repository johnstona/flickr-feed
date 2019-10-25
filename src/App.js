import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import API from '../src/adapters/API'

const App = () => {
  const [pictures, setPictures] = useState([])

  useEffect(() => {
    API.getPictures()
      .then(resp => setPictures(resp.items))
  }, [])

}

export default App;
