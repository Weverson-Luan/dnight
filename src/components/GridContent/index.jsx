import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-end',
    height: 220,
    width: 160
  },
  textContainer: {
    backgroundColor: "#000000c0",
    padding: 10,
    height: '100%',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 38,
    color: '#fff',
    fontWeight: "bold",
  },
  itemDescription: {
    fontWeight: "bold",
    fontSize: 14,
    color: '#fff',
  }, 
  searchText: {
    fontWeight: "bold",
    fontSize: 12,
    color: '#727272',
  },
});

export function GridContent ({ itemBg, itemTitle, itemDescription }){
  return(
    <ImageBackground source={itemBg} style={styles.itemContainer} imageStyle={{ borderRadius: 8 }}>
    <View style={styles.textContainer}>
    <View>
        <Text style={styles.itemTitle}>{itemTitle}</Text>
      </View>
      <View>
        <Text style={styles.itemDescription}>{itemDescription}</Text>
        <Text style={styles.searchText}>Buscar eventos</Text>
      </View>
    </View>
  </ImageBackground>
  )
}

GridContent.propTypes = {
  itemBg: PropTypes.number,
  itemTitle: PropTypes.string,
  itemDescription: PropTypes.string,
}

GridContent.defaultProps = {
  itemBg: 0,
  itemTitle: '',
  itemDescription: '',
}
