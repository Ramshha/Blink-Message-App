import React, { useState, useEffect } from 'react';
import { update, remove } from 'firebase/database';
import { database, ref, onValue, auth, onAuthStateChanged } from "../../../FirebaseConfig";
import Bell from '../../../images/bell-icon.png';
import './Notification.css';
import Remove from '../../../images/remove.png';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null); 
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Effect to handle user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user state if authenticated
      } else {
        setUser(null); // Clear user and notifications if not authenticated
        setNotifications([]);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  // Effect to listen for notifications when user is authenticated
  useEffect(() => {
    if (user) {
      const notificationRef = ref(database, `users/${user.uid}/notifications`);
      const unsubscribe = onValue(notificationRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Transform notifications data into an array
          const notificationsArray = Object.entries(data).map(([id, notif]) => ({ id, ...notif }));
          setNotifications(notificationsArray); // Update state with notifications
        } else {
          setNotifications([]); // Clear notifications if none found
        }
      });
      return () => unsubscribe(); // Cleanup subscription on user change
    }
  }, [user]);

  // Function to mark notification as read on click
  const handleNotificationClick = (notif) => {
    if (!notif.read && user) {
      update(ref(database, `users/${user.uid}/notifications/${notif.id}`), { read: true })
        .then(() => {
          // Update local state to reflect read status
          const updatedNotifications = notifications.map(n =>
            n.id === notif.id ? { ...n, read: true } : n
          );
          setNotifications(updatedNotifications);
        });
    }
  };

  // Function to remove a notification
  const handleRemoveNotification = (notificationId) => {
    if (user) {
      const notificationRef = ref(database, `users/${user.uid}/notifications/${notificationId}`);
      remove(notificationRef)
        .then(() => {
          // Update local state to reflect removal
          setNotifications(notifications.filter(notif => notif.id !== notificationId));
        })
        .catch((error) => {
          console.error("Error removing notification: ", error);
        });
    }
  };

  // Count of unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className='notification'>
      <button onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
        <img src={Bell} alt='bell-icon' height="30px" className="my-1"/>
        {unreadCount > 0 && <span className='notification-badge'>{unreadCount}</span>}
      </button>
      {isDropdownVisible && (
        <div className='notification-dropdown'>
          <div className='notification-content'>
            {notifications.length > 0 ? (
              <ul>
                {notifications.slice().reverse().map((notif) => (
                  <li
                    key={notif.id}
                    className={notif.read ? 'read' : 'unread'}
                    onClick={() => handleNotificationClick(notif)}
                    style={{ fontWeight: notif.read ? 'normal' : 'bold', cursor: 'pointer' }}
                  >
                    {notif.notify}
                    <span>
                      {new Date(notif.timeStamp).toLocaleString()}
                      <button id="del-btn" onClick={() => handleRemoveNotification(notif.id)}>
                        <img src={Remove} alt="remove" width="10px"/>
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;

