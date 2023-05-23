import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {ChartDot, ChartPath, ChartPathProvider} from '@rainbow-me/animated-charts';

const Chart = ({name, symbol, currentPrice, logoUrl, priceChangePercentage7d, sparkline}) => {

  const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : '#FF3B30'; 
  
  return (
    <ChartPathProvider>
        <View style={styles.chartWrapper}>
        {/* titles */}
        <View style={styles.titlesWrapper}>
            <View style={styles.upperTitles}>
                <View style={styles.upperLeftTitle}>
                    <Image source={{ uri: logoUrl }} style={styles.image}/>
                    <Text style={styles.subtitle}>{name} ({symbol.toUpperCase()})</Text>
                </View>

                <Text style={styles.subtitle}> 7d </Text>
            </View>

            <View style={styles.lowerTitles}>
                <Text style={styles.boldTitle}>${currentPrice.toLocaleString('en-US', { currency: 'USD'})}</Text>
                <Text style={[styles.title, {color: priceChangeColor}]}>{priceChangePercentage7d.toFixed(2)}%</Text>
            </View>

        </View>
        </View>
    </ChartPathProvider>
  )
}

export default Chart

const styles = StyleSheet.create({
    chartWrapper: {
        margin: 16,
    },
    titlesWrapper: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    upperTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    upperLeftTitle: { 
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        // Image won't show without height, width set! 
        width: 24, 
        height: 24, 
        marginRight: 4,
    },
    subtitle: {
        fontSize: 14, 
        color: '#A9ABB1',
    },
    lowerTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boldTitle: {
        fontSize: 24, 
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18, 
    },
});