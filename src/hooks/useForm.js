import { useState } from 'react'

export const useForm = (callback, initialValues) => {
  const [input, setInput] = useState(initialValues)

  const handleSubmit = e => {
    e.preventDefault()
    callback()
  }

  const handleChange = e => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const handleDropdownChange = (e, { name, value }) => {
    setInput({ ...input, [name]: value })
  }

  return {
    handleChange,
    input,
    setInput,
    handleSubmit,
    handleDropdownChange
  }
}

export default { useForm }