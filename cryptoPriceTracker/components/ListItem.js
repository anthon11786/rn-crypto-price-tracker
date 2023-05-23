import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress }) => {


  const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : '#FF3B30'; 
  // Wrap whole thing in touchableOpacity so the entire list item is clickable  
  // Will separate it into left and right vies 
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.itemWrapper}>
            {/* Left side */}
            <View style={styles.leftWrapper}>
                <Image source={{ uri: logoUrl }} style={styles.image} />
                
                <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
                </View>
            </View>

            {/* Right Side */}
            <View style={styles.rightWrapper}>
                <Text style={styles.title}>${currentPrice.toLocaleString('en-US', { currency: 'USD'})}</Text>
                <Text style={[styles.subtitle, {color: priceChangeColor}]}>{priceChangePercentage7d.toFixed(2)}%</Text> 
            </View>
            

        </View>
    </TouchableOpacity>
  )
}

export default ListItem

const styles = StyleSheet.create({
    itemWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 24, 
        flexDirection: 'row', 
        alignItems: 'center', // Aligns at x= 0
    },
    leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    rightWrapper: {
        alignItems: 'flex-end' // pushes all to align to the right 
    },
    titlesWrapper: {
        marginLeft: 8, 
    },
    image: {
        // You can't see an image until you set height + width!!!
        height: 48, 
        width: 48,
    }, 
    title: {
        fontSize: 18, 
    },
    subtitle: {
        fontSize: 14,
        color: "#A9ABB1",
        marginTop: 4,
    },
})