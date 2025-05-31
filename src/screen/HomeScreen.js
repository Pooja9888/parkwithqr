import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Linking,
  Modal,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import images from '../const/images';
import { useFocusEffect } from '@react-navigation/native';
import walletService from '../services/walletService';
import asyncStorage from '../generic/storage';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

const showToast = (message, type) => {
  Toast.show({
    type,
    position: 'top',
    text1: message,
  });
};

const data = [
  { id: '1', image: images.toll, title: 'FastTag Recharge', link: 'https://paytm.com/fastag-recharge' },
  { id: '2', image: images.puc, title: 'PUC', link: 'https://puc.parivahan.gov.in/puc/' },
  { id: '3', image: images.insurance, title: 'Insurance', link: 'https://financialservices.gov.in/beta/en/public-sector-insurers' },
  { id: '4', image: images.drivingLicence, title: 'Driving Licence', link: 'https://parivahan.gov.in/parivahan//en/content/driving-licence-0' },
  { id: '5', image: images.vehicleDoc, title: 'RC', link: 'https://parivahan.gov.in/parivahan//en/content/vehicle-registration' },
];

const HomeScreen = ({ route, navigation }) => {
  const [isEmergencyModalVisible, setEmergencyModalVisible] = useState(false);
  const [imagesSlider] = useState([
    'https://cms-img.coverfox.com/how-to-get-puc-certificate.webp',
    'https://cms-img.coverfox.com/tips-for-car-insurance-policy-renewal-while-social-distancing.webp',
    'https://www.digitalindiagov.in/wp-content/uploads/2021/10/fastaguffizio1_2_o.png',
    'https://assets.isu.pub/document-structure/221019061845-e3ca625316ffb29d22178a238a357124/v1/0ff505319dcecee04619aba690aae4ca.jpeg',
    'https://www.shutterstock.com/image-vector/innovative-technology-flat-concept-vector-260nw-2387382547.jpg',
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const [walletBalance, setWalletBalance] = useState("0.00");
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscription, setIsSubscription] = useState(false);


  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.showEmergencyPopup) {
        setEmergencyModalVisible(true);
        // Reset the route parameter after triggering the modal
        navigation.setParams({ showEmergencyPopup: false });
      }
    }, [route?.params?.showEmergencyPopup])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === imagesSlider.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, imagesSlider.length]);

  const handleEmergencyResponse = (response) => {
    setEmergencyModalVisible(false);
    if (response === 'yes') {
      Linking.openURL('tel:112');
    }
  };

  const handlePress = async () => {
    if (isSubscription) {
      navigation.navigate('DownloadQR');
    } else {
      navigation.navigate('Subscription');
    }
  };

  const handleVehicle = () => {
    navigation.navigate('CallScreen');
  };
  const handlePhone = () => {
    navigation.navigate('CallScreen');
  };
  const fetchWalletBalance = async () => {
    try {
      setIsLoading(true);
      const response = await walletService.updateConfig();
      setWalletBalance(response?.data?.amount?.balance || "0.00");
      await asyncStorage.setItem('wallet', response?.data?.amount?.balance || 0);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWalletBalance();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchWalletBalance();
    }, [])
  );

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await asyncStorage.getItem('name');
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.log('Error fetching name:', error);
      }
    };
    fetchUserName();
  }, []);
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const sub = await asyncStorage.getItem('is_subscribed');
        setIsSubscription(JSON.parse(sub)); // parses "true"/"false" to boolean

      } catch (error) {
        console.log('Error fetching subscription:', error);
      }
    };
    fetchSubscription();
  }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listBox}
      onPress={() => {
        if (item.title === 'PUC') {
          navigation.navigate('PucForm');
        } 
        else if(item.title === 'Insurance'){
          navigation.navigate('InsuranceForm');
        }
        else if(item.title === 'Driving Licence'){
          navigation.navigate('DrivingLicenceForm');
        }
        else if(item.title === 'RC'){
          navigation.navigate('RcForm');
        }
        else {
          Linking.openURL(item.link).catch((err) =>
            console.error('Failed to open link', err)
          );
        }
      }}
    >
      <Image style={styles.image} source={item.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        {/* <Text>Loading...</Text> */}
        <ActivityIndicator size="large" color="#5F259F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        transparent
        visible={isEmergencyModalVisible}
        animationType="slide"
        onRequestClose={() => setEmergencyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Emergency Assistance</Text>
            <Text style={styles.modalText}>
              Do you want to make an emergency call?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#5F259F' }]}
                onPress={() => handleEmergencyResponse('yes')}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'grey' }]}
                onPress={() => handleEmergencyResponse('no')}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Content */}
      <View style={{ flexDirection: 'row' }}>
        {/* <View style={styles.walletContainerx}>
          <Image style={styles.wallet} source={images.account} />
          <Text style={styles.walletText}>{userName}</Text>
        </View> */}
        {isSubscription ? (
          <View style={styles.walletContainerx}>
            <View style={styles.activeButton}></View>
            <Text style={styles.walletText}>{userName}</Text>
          </View>
        ) : (
          <View style={styles.walletContainerx}>
            <View style={styles.deActiveButton}></View>
            <Text style={styles.walletText}>{userName}</Text>
          </View>
        )}

        <View style={styles.walletContainer}>
          <Image style={styles.wallet} source={images.wallet} />
          <Text style={styles.walletText}>₹{walletBalance}</Text>
        </View>

      </View>
      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={handlePress}>
          <Image style={styles.image} source={images.qrcode} />
          <Text style={styles.textTitle}>Download QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={handleVehicle}>
          <Image style={styles.image} source={images.car} />
          <Text style={styles.textTitle}>My Vehicles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={handlePhone}>
          <Image style={styles.image} source={images.phone} />
          <Text style={styles.textTitle}>Call Support</Text>
        </TouchableOpacity>
      </View>
      <ScrollView >
        <View style={{ height: height / 3, marginTop: 20, }}>
          <FlatList
            ref={flatListRef}
            data={imagesSlider}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.sliderItem}>
                <Image source={{ uri: item }} style={styles.sliderImage} />
              </View>
            )}
          />
          <View style={styles.dotsContainer}>
            {imagesSlider.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>
        <Text style={styles.headingText}>Informations</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    backgroundColor: '#5F259F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    elevation: 10, // Increased for Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 4 }, // Increased height for better shadow
    shadowOpacity: 0.5, // Increased opacity
    shadowRadius: 6, // Increased blur effect
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  textTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  sliderItem: {
    width,
    alignItems: 'center',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#5F259F',
  },
  deActiveButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#FB3E3E'
  },
  activeButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'green'
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 12,
    marginHorizontal: 30,
    color: '#333'
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  listBox: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    color: '#5F259F',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5F259F'
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#a677db'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 10, // Increased padding to make the button taller
    paddingHorizontal: 40, // Increased padding to make the button wider
    borderRadius: 10, // Adjust the border radius for a more prominent button
    margin: 5, // Adds space between the buttons
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Adjust font size for the text to match the button size
    fontWeight: 'bold',
    textAlign: 'center',
  },
  walletContainerx: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    width: '57%',
  },
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
    margin: 15,
    width: '28%',
    backgroundColor: '#fff',
    borderColor: '#5F259F',
    borderWidth: 1,
    borderRadius: 10
  },
  walletText: {
    color: '#5F259F',
    fontWeight: '500',
    fontSize: 18,
    left: 5
  },
  wallet: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  }
});

export default HomeScreen;

