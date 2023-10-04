//Avlokita's Work

import * as React from 'react'
import { StyleSheet, View, Text, Image, SafeAreaView, StatusBar, VirtualizedList} from "react-native"


export default function Home({navigation}){
    return(
        <SafeAreaView style={styles.scroll_container}>
        <VirtualizedList
            initialNumToRender={8}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            getItemCount={getItemCount}
            getItem={getItem}
             />
        </SafeAreaView>
    )
}
const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
  });
  
const getItemCount = _data => 50;

const Item = ({title}) => (
<View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
</View>
);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    temp : {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue',
    },

    scroll_container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
      },
      item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
      },
      title: {
        fontSize: 32,
      },
  });