/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Stars from './src/assets/icons/Stars.svg';

//DATA

const DATA = {
  card: [
    {
      id: '1',
      rating: 4.8,
      title: 'Cappucino',
      subtitle: 'with chocolate',
      price: 4.53,
    },
    {
      id: '2',
      rating: 4.9,
      title: 'Cappucino',
      subtitle: 'with oat milk',
      price: 3.9,
    },
    {
      id: '3',
      rating: 4.7,
      title: 'Latte',
      subtitle: 'with caramel syrup',
      price: 4.7,
    },
    {
      id: '4',
      rating: 4.6,
      title: 'Espresso',
      subtitle: 'double shot',
      price: 3.25,
    },
    {
      id: '5',
      rating: 4.8,
      title: 'Flat White',
      subtitle: 'with almond milk',
      price: 4.1,
    },
    {
      id: '6',
      rating: 4.9,
      title: 'Mocha',
      subtitle: 'with dark chocolate',
      price: 4.8,
    },
    {
      id: '7',
      rating: 4.5,
      title: 'Americano',
      subtitle: 'iced',
      price: 3.15,
    },
    {
      id: '8',
      rating: 4.6,
      title: 'Macchiato',
      subtitle: 'with vanilla syrup',
      price: 3.75,
    },
    {
      id: '9',
      rating: 4.7,
      title: 'Cappucino',
      subtitle: 'with soy milk',
      price: 4.2,
    },
    {
      id: '10',
      rating: 4.8,
      title: 'Latte',
      subtitle: 'with hazelnut syrup',
      price: 4.6,
    },
  ],
  jenisKopi: [
    {
      id: '1',
      name: 'Espresso',
    },
    {
      id: '2',
      name: 'Cappuccino',
    },
    {
      id: '3',
      name: 'Latte',
    },
    {
      id: '4',
      name: 'Americano',
    },
    {
      id: '5',
      name: 'Mocha',
    },
    {
      id: '6',
      name: 'Flat White',
    },
    {
      id: '7',
      name: 'Macchiato',
    },
    {
      id: '8',
      name: 'Affogato',
    },
    {
      id: '9',
      name: 'Cortado',
    },
    {
      id: '10',
      name: 'Irish Coffee',
    },
  ],
};

const Card = ({id, rating, title, subtitle, price}) => {
  const images = {
    '1': require('./src/assets/img/coffee/1.jpg'),
    '2': require('./src/assets/img/coffee/2.jpg'),
    '3': require('./src/assets/img/coffee/3.jpg'),
    '4': require('./src/assets/img/coffee/4.jpg'),
    '5': require('./src/assets/img/coffee/5.jpg'),
    '6': require('./src/assets/img/coffee/6.jpg'),
    '7': require('./src/assets/img/coffee/7.jpg'),
    '8': require('./src/assets/img/coffee/8.jpg'),
    '9': require('./src/assets/img/coffee/9.jpg'),
    '10': require('./src/assets/img/coffee/10.jpg'),
  };

  return (
    <View style={styles.card}>
      <ImageBackground source={images[id]} resizeMode="cover">
        <View style={styles.cardImage}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 5,
              paddingTop: 5,
            }}>
            <Stars width={17} height={17} style={{fill: 'gold'}} />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white',
                paddingLeft: 10,
              }}>
              {rating}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.cardDesc}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
        <Text style={{fontSize: 13}}>{subtitle}</Text>
        <View style={styles.cardDesc2}>
          <Text style={{fontSize: 20}}>$ {price}</Text>
          <Button
            title="+"
            color="#A5682A"
            onPress={() =>
              Alert.alert(title + ' Telah Ditambahkan kedalam keranjang')
            }
          />
        </View>
      </View>
    </View>
  );
};

const App = () => {
  const [text, onChangeText] = React.useState('Useless Text');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <View style={{alignContent: 'center'}}>
              <Text style={{fontSize: 15}}>Ahmad Rofiqi</Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Latihan React Native
              </Text>
            </View>
            <Image
              source={require('./src/assets/img/foto.png')}
              style={styles.fotoProfil}
            />
          </View>
          {/* <Button color="green" title="Go To Home" /> */}
        </View>
        <View style={{gap: 20}}>
          <TextInput
            onChangeText={onChangeText}
            style={styles.input}
            placeholder="Search Coffee...."
          />
          <ImageBackground
            source={require('./src/assets/img/coffee/1.jpg')}
            resizeMode="cover"
            style={{
              borderRadius: 8,
              overflow: 'hidden',
            }}>
            <View style={styles.hero}>
              <Text style={styles.promo}>Promo</Text>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
                Buy One get
              </Text>
              <Text style={{fontSize: 28, fontWeight: 'bold', color: 'black'}}>
                One free
              </Text>
            </View>
          </ImageBackground>
          <ScrollView
            style={styles.scrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.sortItemList}>
              {DATA.jenisKopi.map(item => (
                <View>
                  <Text style={styles.sortItem} key={item.id}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.listCard}>
            {DATA.card.map(item => (
              <Card
                key={item.id}
                id={item.id}
                rating={item.rating}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fotoProfil: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
  },
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  hero: {
    backgroundColor: 'rgba(242, 242, 242, 0.5)',
    height: 200,
    padding: 20,
    justifyContent: 'flex-end',
    backgroundOpacity: 0.4,
  },
  promo: {
    backgroundColor: 'salmon',
    width: 70,
    color: 'white',
    padding: 1,
    textAlign: 'center',
    borderRadius: 5,
  },
  sortItem: {
    backgroundColor: '#A5682A',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
    flexDirection: 'row',
  },
  sortItemList: {
    flexDirection: 'row',
    gap: 10,
  },
  listCard: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    alignContent: 'space-between',
  },
  card: {
    backgroundColor: '#f5f5f5',
    width: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: 150,
    height: 150,
    // backgroundColor: '#A5682A',
  },
  cardDesc: {
    padding: 5,
  },
  cardDesc2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
});

export default App;
