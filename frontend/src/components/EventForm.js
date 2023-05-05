import { useState } from 'react'
import { useEventsContext } from "../hooks/useEventsContext"
import { useAuthContext } from '../hooks/useAuthContext'
const EventForm = () => {
  const {dispatch}=useEventsContext()
  const {user}=useAuthContext()
  const [name,setName]=useState('')
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState('')
  const [hobbies, setHobbies] = useState('')
  const [error, setError] = useState(null)
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }

    const event = {name,phone,email,hobbies}
    
    const response = await fetch('http://localhost:4001/api/events', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setName('')
      setPhone('')
      setEmail('')
      setHobbies('')
      console.log('new event added:', json)
      dispatch({type:'CREATE_EVENT',payload:json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New CRUDS</h3>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
      />
       <label>Phone:</label>
      <input 
        type="tel" 
        onChange={(e) => setPhone(e.target.value)} 
        value={phone}
      />

      <label>Email:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
      />

      <label>Hobbies:</label>
      <input 
        type="text" 
        onChange={(e) => setHobbies(e.target.value)} 
        value={hobbies} 
      />

      <button>Add Data</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EventForm