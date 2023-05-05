import {useEventsContext} from'../hooks/useEventsContext'
import { useAuthContext } from '../hooks/useAuthContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const EventDetails=({event})=>{
    const { dispatch } = useEventsContext()
    const {user}=useAuthContext()


  const handleClick = async () => {

    if(!user){
      return
    }

    const response = await fetch('http://localhost:4001/api/events/' + event._id, {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_EVENT', payload: json})
    }
  }
return(
    <div className="event-details">
        <h4>{event.name}</h4>
        <p><strong>Phone No: </strong>{event.phone}</p>
        <p><strong>Email: </strong>{event.email}</p>
        <p><strong>Hobbies: </strong>{event.hobbies}</p>
        <p>{formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
)
}
export default EventDetails