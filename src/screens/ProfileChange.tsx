import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ProfileInfoChange() {
  const [name, setName] = useState(''); // Initial name state
  const [editedName, setEditedName] = useState(''); // State for edited name
  const navigation = useNavigation(); // Get navigation object

  // Function to handle saving the edited name
  const handleSaveName = () => {
    // Update the name state with the edited name
    setName(editedName);
    // Clear the editedName state after saving
    setEditedName('');
    // You can also add logic here to send the edited name to the server or perform any other necessary actions
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.horizontalLine} />
      </View>
      <Text style={styles.pageTitle}>프로필 정보 변경</Text>
      <TouchableOpacity style={styles.changeButton} onPress={handleSaveName}>
        <Text style={styles.changeButtonText}>변경</Text>
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>이름</Text>
          <View style={styles.inputWrapper}>
            {/* Display the current name in TextInput */}
            <TextInput
              style={styles.inputText}
              value={editedName} // Use editedName state as the value
              onChangeText={setEditedName} // Update editedName state
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFE',
    position: 'relative',
  },
  header: {
    height: 102,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  horizontalLine: {
    width: '100%',
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEBEB',
    top: 102,
  },
  pageTitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: 'black',
    position: 'absolute',
    top: 67,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  changeButton: {
    position: 'absolute',
    top: 67,
    right: 30,
  },
  changeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#0094FF',
  },
  formContainer: {
    marginTop: 148,
    paddingHorizontal: 35,
  },
  inputContainer: {
    marginBottom: 38,
  },
  label: {
    color: '#373737',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    marginBottom: 19,
  },
  inputWrapper: {
    width: '100%',
    height: 56,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputText: {
    color: '#C1C1C1',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
});

export default ProfileInfoChange;
