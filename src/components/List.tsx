// List.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }:any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  {/*   <Text>{details}</Text> */}
  </View>
);

// the filter
const List = ({ searchPhrase, setCLicked, data }:any) => {


  const renderItem = ({ item }:any) => {
    // when no input, show all
  
    if (searchPhrase === "") {
      return <Item name={item.nombre} details={item.instrucciones} />;
    }
    // filter of the name
    if (item.nombre.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.nombre} details={item.instrucciones} />;
    }
    // filter of the description
    if (item.instrucciones.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.nombre} details={item.instrucciones} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View onStartShouldSetResponder={() =>  setCLicked(false) }>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 5,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 7,
/*     borderBottomWidth: 2,
    borderBottomColor: "lightgrey" */
  },
  title: {
    color:'white',
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5
  },
});