import React from 'react'
import { useForm } from '../hooks/useForm'

const SearchBar = ({ search, currentSearch, clear }) => {

  const callback = () => {
    search(input.searchTerm)
  }

  const initialValues = {
    searchTerm: currentSearch
  }

  const { input, handleChange, handleSubmit} = useForm(callback, initialValues)

  return <div className={'search-bar'}>
          <form onSubmit={handleSubmit} className={'search-form'}>
          <label>
            Search by tag:  
            <input onChange={handleChange} type="text" name="searchTerm" value={input.searchTerm} placeholder="e.g. 'Cats'"  />
          </label>
              <button type="submit" value="Submit" >Search </button>
          </form>
          </div>
}

export default SearchBar