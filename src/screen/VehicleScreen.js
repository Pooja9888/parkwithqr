import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import images from '../const/images';

const { width, height } = Dimensions.get('window');

const data = [
  { id: '1', image: images.toll, title: 'FastTag Recharge' },
  { id: '2', image: images.toll, title: 'Puc Reminder' },
  { id: '3', image: images.toll, title: 'Insurence Reminder' },
  { id: '4', image: images.toll, title: 'Driving lincence Reminder' },
  { id: '5', image: images.toll, title: 'Vehical Document' },
  // { id: '6', image: images.toll, title: 'FastTag Recharge' },
  // { id: '7', image: images.toll, title: 'FastTag Recharge' },
  // { id: '8', image: images.toll, title: 'FastTag Recharge' },
];

const VehicleScreen = () => {
  const [imagesSlider] = useState([
    'https://www.digitalindiagov.in/wp-content/uploads/2021/10/fastaguffizio1_2_o.png',
    'https://cms-img.coverfox.com/how-to-get-puc-certificate.webp',
    'https://cms-img.coverfox.com/tips-for-car-insurance-policy-renewal-while-social-distancing.webp',
    'https://assets.isu.pub/document-structure/221019061845-e3ca625316ffb29d22178a238a357124/v1/0ff505319dcecee04619aba690aae4ca.jpeg',
    'https://www.shutterstock.com/image-vector/innovative-technology-flat-concept-vector-260nw-2387382547.jpg',
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === imagesSlider.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentIndex, imagesSlider.length]);

  const renderItem = ({ item }) => (
    <View style={styles.listBox}>
      <Image style={styles.image} source={item.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={images.qr} />
          <Text style={styles.textTitle}>Scan QR</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={images.vehicle} />
          <Text style={styles.textTitle}>My Vehicles</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={images.phone} />
          <Text style={styles.textTitle}>Call Support</Text>
        </View>
      </View>

      <View style={{ height: height / 3, marginTop: 20 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },
  imageContainer: {
    backgroundColor: '#5F259F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    elevation: 5,
  },
  image: {
    width: 40,
    height: 40,
  },
  textTitle: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 8,
  },
  headingText: {
    fontSize: 25,
    color: '#5F259F',
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 20,
  },
  listBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    margin: 12,
    elevation: 5,
  },
  row: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    color: '#5F259F',
    fontWeight: '500',
    marginTop: 8,
  },
  sliderItem: {
    width,
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: '#5F259F',
  },
});

export default VehicleScreen;
