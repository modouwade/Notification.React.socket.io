import Notification from '../../img/notification.svg'
import Message from '../../img/message.svg'
import Settings from '../../img/settings.svg'
import './navbar.css'
import { useEffect, useState } from 'react';
const Navbar = ({socket}) => {
const [notifications, setNotification] = useState([])
const [open, setOpen] = useState(false)

  useEffect(() => {
   socket.on('getNotification', data => {
setNotification(prev => [...prev, data])
   })
  }, [socket])

  const displayNotification = ({senderName, type}) =>{
    let action
    if(type === 1) {
      action="liked"
    } else if (type===2) {
      action='commented'
    } else {
      action='shared'
    }
    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    )
  }

  const handleRead = () => {
    setNotification([])
    setOpen(false)
  }

  return (
    <div className="navbar">
     <span className="logo">Lama App</span>
     <div className="icons">
       <div className="icon" onClick={() => setOpen(!open)}>
         <img src={Notification} alt="" className="iconImg" />
         {
           notifications.length > 0 && (
              <div className="counter">{notifications.length}</div>
           )
         }
        
       </div>
       <div className="icon"  onClick={() => setOpen(!open)}> 
         <img src={Message} alt="" className="iconImg" />
         
       </div>
       <div className="icon" onClick={() => setOpen(!open)}>
         <img src={Settings} alt="" className="iconImg" />
       </div>
     </div>
     {open && 
     <div className="notifications">
       {notifications.map((n)=> {
         return(
           <div key={n.type}>
             {displayNotification(n)}
           </div>
         )
        })}
        <button className="nButton" onClick={handleRead}>Mark as read</button>
     </div>
      }
    </div>
  );
};

export default Navbar;
