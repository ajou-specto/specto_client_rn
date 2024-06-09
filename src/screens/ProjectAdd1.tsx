import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProjectAddScreenStackParamList } from '@stackNav/ProjectAddScreen';

type ContestProps = NativeStackScreenProps<
  ProjectAddScreenStackParamList,
  'ProjectAdd1'
>;

function ProjectAdd1({ route, navigation }: Readonly<ContestProps>) {
  const { id, specDetail } = route.params;
  const [name, setName] = useState(specDetail?.name ?? ''); // 활동명 상태 생성

  const handleNext = () => {
    const value = { id, specDetail, name };
    console.log('ProjectAdd1 -> ProjectAdd2', value);
    navigation.navigate('ProjectAdd2', value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageIndicator}>
        <Text style={styles.currentPage}>1</Text>
        <Text style={styles.totalPages}>/3</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>어떤 논문/프로젝트인가요?</Text>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>이름</Text>
        <TextInput
          style={styles.inputText}
          placeholder="활동 이름을 입력해주세요."
          onChangeText={text => setName(text)} // name 값 업데이트
          value={name}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
        <Text style={styles.buttonText}>다음으로</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    position: 'absolute',
    top: 50,
    left: 32,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  question: {
    color: '#373737',
    fontSize: 18,
    fontWeight: '600',
  },
  inputBox: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    position: 'absolute',
    top: 90,
    left: 30,
    alignItems: 'center',
    width: '85%',
  },
  inputLabel: {
    alignSelf: 'stretch',
    color: '#9F9F9F',
    fontSize: 10,
    fontWeight: '400',
  },
  inputText: {
    marginTop: 5,
    alignSelf: 'stretch',
    color: '#C1C1C1',
    fontSize: 16,
    fontWeight: '400',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#0094FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 50, // 높이 조절
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  pageIndicator: {
    position: 'absolute',
    top: 20,
    right: 30,
    flexDirection: 'row',
  },
  currentPage: {
    color: '#0094FF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  totalPages: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
});

export default ProjectAdd1;
