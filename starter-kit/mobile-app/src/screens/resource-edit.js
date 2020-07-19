import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';

import {ScrollView} from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import {CheckedIcon, UncheckedIcon} from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';

import {update, remove, userID} from '../lib/utils';

const styles = StyleSheet.create({
  outerView: {
    // flex: 1,
    padding: 22,
    backgroundColor: '#FFF',
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeArea: {
    width: '40%',
    // borderWidth: 1,
    // borderColor: 'red',
  },

  selectorLabel: {
    paddingTop: 10,
  },

  inputContainer: {
    marginBottom: 25,
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 16,
    marginBottom: 25,
    fontSize: 16,
  },
  selectorAndroid: {
    fontFamily: 'IBMPlexSans-Medium',
    color: 'black',
    padding: 0,
    margin: 0,
    fontSize: 16,
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 16,
    marginBottom: 25,
  },
  quantityArea: {
    width: '40%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 13,
  },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#f4f4f4',
    color: '#999',
    flex: 1,
    padding: 16,
    elevation: 2,
    marginBottom: 25,
  },
  updateButton: {
    backgroundColor: '#1062FE',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 15,
  },
  deleteButton: {
    backgroundColor: '#da1e28',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 15,
  },
});

const EditResource = props => {
  const clearItem = {
    userID: userID(),
    e: 'Food',
    name: '',
    description: '',
    location: '',
    contact: '',
    quantity: '1',
  };
  const [item, setItem] = React.useState(clearItem);
  const [useLocation, setUseLocation] = React.useState(false);
  const [position, setPosition] = React.useState({});

  React.useEffect(() => {
    props.navigation.addListener('focus', () => {
      const item = props.route.params.item;
      setItem({
        ...item,
        quantity: item.quantity.toString(),
      });

      Geolocation.getCurrentPosition(pos => {
        setPosition(pos);
      });
    });
  }, []);

  const toggleUseLocation = () => {
    if (!useLocation && position) {
      setItem({
        ...item,
        location: `${position.coords.latitude},${position.coords.longitude}`,
      });
    }
    setUseLocation(!useLocation);
  };

  const updateItem = () => {
    const payload = {
      ...item,
      quantity: isNaN(item.quantity) ? 1 : parseInt(item.quantity),
      id: item.id || item['_id'],
    };

    update(payload)
      .then(() => {
        Alert.alert('Done', 'Your item has been updated.', [{text: 'OK'}]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{text: 'OK'}]);
      });
  };

  const confirmDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
      {text: 'Cancel'},
      {text: 'Delete', onPress: () => deleteItem()},
    ]);
  };

  const deleteItem = () => {
    const payload = {
      ...item,
      id: item.id || item['_id'],
    };

    remove(payload)
      .then(() => {
        Alert.alert('Done', 'Your item has been deleted.', [{text: 'OK'}]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{text: 'OK'}]);
      });
  };

  return (
    <ScrollView style={styles.outerView}>
      <View style={styles.splitView}>
        <View style={styles.typeArea}>
          <Text style={styles.selectorLabel}>Type</Text>
          <PickerSelect
            style={{
              inputIOS: styles.selector,
              inputAndroid: styles.selectorAndroid,
            }}
            value={item.type}
            onValueChange={t => setItem({...item, type: t})}
            items={[
              {label: 'Food', value: 'Food'},
              {label: 'Help', value: 'Help'},
              {label: 'Other', value: 'Other'},
            ]}
          />
        </View>
        <View style={styles.quantityArea}>
          {/* <Text style={styles.inputLabel}>Quantity</Text> */}
          <TextField
            style={styles.textInput}
            label="Quantity"
            labelFontSize={14}
            labelTextStyle={{color: 'black'}}
            value={item.quantity}
            onChangeText={t => setItem({...item, quantity: t})}
            onSubmitEditing={updateItem}
            returnKeyType="send"
            enablesReturnKeyAutomatically={true}
            placeholder="e.g., 10"
            keyboardType="numeric"
          />
        </View>
      </View>

      <TextField
        style={styles.textInput}
        value={item.name}
        label="Name"
        onChangeText={t => setItem({...item, name: t})}
        onSubmitEditing={updateItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="e.g., Tomotatoes"
        blurOnSubmit={false}
      />

      <TextField
        style={styles.textInput}
        label="Contact"
        value={item.contact}
        onChangeText={t => setItem({...item, contact: t})}
        onSubmitEditing={updateItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="user@domain.com"
      />

      <TextField
        style={styles.textInput}
        label="Description"
        value={item.description}
        multiline
        characterRestriction={300}
        onChangeText={t => setItem({...item, description: t})}
        onSubmitEditing={updateItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="e.g., small baskets of cherry tomatoes"
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleUseLocation}>
          {useLocation ? (
            <CheckedIcon height="18" width="18" />
          ) : (
            <UncheckedIcon height="18" width="18" />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}> Use my current location </Text>
      </View>
      <TextField
        label="Location"
        value={item.location}
        disabled={useLocation}
        onChangeText={t => setItem({...item, location: t})}
        onSubmitEditing={updateItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="street address, city, state"
      />

      {item.type !== '' &&
        item.name.trim() !== '' &&
        item.contact.trim() !== '' && (
          <TouchableOpacity onPress={updateItem}>
            <Text style={styles.updateButton}>Update</Text>
          </TouchableOpacity>
        )}

      <TouchableOpacity onPress={confirmDelete}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditResource;
