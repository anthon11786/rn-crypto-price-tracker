import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useRef, useMemo, useState } from 'react';

import ListItem from './components/ListItem';
import Chart from './components/Chart';

import { SAMPLE_DATA } from './assets/data/sampleData'

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const ListHeader = () => (
  
  // Add empty tag to wrap properly? 
  <>
  <View style={styles.titleWrapper}>
    <Text style={styles.largeTitle}>Markets</Text>
  </View>
  <View style={styles.divider}/>
  </>
)

export default function App() {

  const [selectedCoinData, setSelectedCoinData] = useState(null);

  // #######################################
  // For Bottom Modal setup
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);
  // ########################################

  function openModal(item) {
    // Before presenting bottom sheet, set selected coin data 
    setSelectedCoinData(item); 
    bottomSheetModalRef.current.present();
  }

  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
      
    <BottomSheetModalProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <FlatList
        keyExtractor={(item) => item.id}
        data={SAMPLE_DATA}
        renderItem={({item}) => (
          <ListItem
            name={item.name} 
            symbol={item.symbol} 
            currentPrice={item.current_price}
            priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
            logoUrl={item.image} 
            onPress={(() => openModal(item))}
          />
        )}
        ListHeaderComponent={<ListHeader />}
      />
    </SafeAreaView>

    {/* Actual bottom sheet*/}
      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0} // Corresponds to starting index in snappoints, only 1 '50%' 
          snapPoints={snapPoints}
          style={styles.bottomSheet}
        >
          {/* This is how you conditionally show an component!  */}
          { selectedCoinData ? (
            <Chart 
              currentPrice={selectedCoinData.current_price}
              logoUrl={selectedCoinData.image}
              priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
              name={selectedCoinData.name}
              symbol={selectedCoinData.symbol}
              sparkline={selectedCoinData.sparkline_in_7d.price}
           />
          ): null} 
      </BottomSheetModal>
    </BottomSheetModalProvider>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  largeTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  titleWrapper: {
    marginTop: 20, 
    paddingHorizontal: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth, 
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: '#000',  //black
    shadowOffset: {
      width: 0, 
      height: -4, 
    }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 5,
  },
});
