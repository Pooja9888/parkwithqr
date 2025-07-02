import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import notificationService from '../services/notificationService';
import { genericEnum } from '../generic/genericEnum';

const SCREEN_WIDTH = Dimensions.get('window').width;

function Notification() {
  const [notifications, setNotifications] = useState([]);

  const notificationList = async () => {
    try {
      const data = await notificationService.notications('get_notification');
      console.log(data.data.data,'data.data.datadata.data.data');
      
      setNotifications(data.data.data);
    } catch (error) {
      showToast(genericEnum.error, 'Error fetching notifications');
    }
  };

  useEffect(() => {
    notificationList();
  }, []);

  const deleteNotification = async (id) => {
    try {
      await notificationService.deleteNotications('delete', id);
    } catch (error) {
      showToast(genericEnum.error, 'Error deleting notification');
    }
  };
const markAsRead = async (id) => {
  try {
    await notificationService.notications('mark_read', id);
    setNotifications(prev =>
      prev.map(n =>
        n._id === id ? { ...n, is_read: true } : n
      )
    );
  } catch (error) {
    showToast(genericEnum.error, 'Error marking notification as read');
  }
};
  return (
    <View style={styles.container}>
      {notifications.map((item) => (
        <SwipeableNotification
          key={item._id}
          item={item}
          onDelete={() => {
            deleteNotification(item._id);
            setNotifications(prev => prev.filter(n => n._id !== item._id));
          }}
          onMarkRead={() => markAsRead(item._id)}
        />
      ))}
    </View>
  );
}
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
};


function SwipeableNotification({ item, onDelete, onMarkRead }) {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -100) {
          Animated.timing(translateX, {
            toValue: -80,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.swipeWrapper}>
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.notificationItem,
          { transform: [{ translateX }] },
          { backgroundColor: item.is_read ?  '#f0f0f0':'#d0e8ff' },
        ]}
        {...panResponder.panHandlers}
      >
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/clouds/100/000000/groups.png' }}
        />
        <View style={styles.textColumn}>
          <Text style={styles.description} numberOfLines={2}>
            {item.message || 'No message'}
          </Text>
          {item.expiryDate && (
            <Text style={styles.time}>Expiry: {formatDate(item.expiryDate)}</Text>
          )}
          {item.notifyDate && (
            <Text style={styles.time}>Notified: {formatDate(item.notifyDate)}</Text>
          )}

          {!item.is_read && (
            <TouchableOpacity onPress={onMarkRead}>
              <Text style={{ color: '#007BFF', marginTop: 6 }}>Mark as Read</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f5',
    padding: 10,
  },
  swipeContainer: {
    marginBottom: 12,
  },
  hiddenDelete: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: '#dc3545',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 10,
  },
  deleteText: {
    color: '#fff',
    fontSize: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    elevation: 2,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  textColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  description: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  time: {
    fontSize: 13,
    color: '#777',
  },
  swipeWrapper: {
  marginBottom: 10,
  position: 'relative',
},
deleteButtonContainer: {
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  width: 80,
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
},
deleteButton: {
  padding: 10,
},
});




// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   Image,
//   Dimensions,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// const notifications = [
//   {
//     id: '1',
//     type: 'fastag',
//     title: 'FASTag Low Balance Alert',
//     description: 'Your FASTag balance is below ₹100. Please recharge to avoid toll issues.',
//     time: '5 mins ago',
//   },
//   {
//     id: '2',
//     type: 'puc',
//     title: 'PUC Certificate Expiry',
//     description: 'Your Pollution Under Control (PUC) certificate will expire in 3 days. Please renew it.',
//     time: 'Today, 9:00 AM',
//   },
//   {
//     id: '3',
//     type: 'rc',
//     title: 'RC Renewal Reminder',
//     description: 'Your Vehicle Registration Certificate is due for renewal this month.',
//     time: 'Yesterday',
//   },
//   {
//     id: '4',
//     type: 'dl',
//     title: 'Driving License Expiry',
//     description: 'Your driving license will expire soon. Apply for renewal to avoid penalty.',
//     time: '2 days ago',
//   },
//   {
//     id: '5',
//     type: 'servicing',
//     title: 'Vehicle Servicing Due',
//     description: 'It’s time for your vehicle’s scheduled servicing. Book your slot today.',
//     time: '3 days ago',
//   },
// ];


// const getTypeColor = (type) => {
//   switch (type) {
//     case 'fastag': return '#64CFFA';
//     case 'puc': return '#f39c12';
//     case 'rc': return '#9b59b6';
//     case 'dl': return '#D8598E';
//     case 'servicing': return '#2ecc71';
//     default: return '#ccc';
//   }
// };

// const Notification = () => {
//   const renderItem = ({ item }) => {
//     return (
//       <View style={styles.card}>
//         <View style={[styles.avatar, { backgroundColor: getTypeColor(item.type) }]}>
//           <Text style={styles.avatarText}>{item.type.charAt(0).toUpperCase()}</Text>
//         </View>
//         <View style={styles.cardContent}>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.description}>{item.description}</Text>
//           <Text style={styles.time}>{item.time}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <Text style={styles.header}>Notifications</Text>
//       <FlatList
//         data={notifications}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: '#f5f7fa',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#0179a2',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   listContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   avatar: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   avatarText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   cardContent: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#333',
//   },
//   description: {
//     fontSize: 13,
//     color: '#555',
//     marginTop: 4,
//   },
//   time: {
//     fontSize: 12,
//     color: '#999',
//     marginTop: 6,
//   },
// });

// export default Notification;
