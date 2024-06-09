import React, { useState, useEffect } from 'react';
// import CalendarPicker from 'react-native-calendar-picker';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  Modal,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InternAddScreenStackParamList } from '@stackNav/InternAddScreen';
// import * as DocumentPicker from 'expo-document-picker';
import axiosInstance from 'src/api/axiosInstance';

// const pickDocument = async () => {
//   const result = await DocumentPicker.getDocumentAsync({});
//   alert(result);
//   console.log(result);
// };

type InternProps = NativeStackScreenProps<
  InternAddScreenStackParamList,
  'InternAdd2'
>;

function InternAdd2({ route, navigation }: Readonly<InternProps>) {
  const { id, specDetail, name, company, work, startDate, endDate, contents } =
    route.params || {};
  const [motivation, setMotivation] = useState<string>(
    specDetail?.detail?.motivation ?? '',
  );
  const [goal, setGoal] = useState<string>(specDetail?.detail?.goal ?? '');
  const [project, setProject] = useState<string>(
    specDetail?.detail?.project ?? '',
  );
  const [proofFile, setProofFile] = useState<string | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const isEditing = !!id; // id가 있으면 수정 모드

  const handleNext = async () => {
    const value = {
      name: name || '기본 이름',
      category: 'INTERNSHIP',
      startDate: startDate || '2024-03-06',
      endDate: endDate || '2024-10-06',
      contents: contents || '기본 내용',
      detail: {
        company: company || '기본 회사',
        work: work || '기본 부서',
        motivation: motivation || '기본 경로',
        goal: goal || '기본 목표',
        project: project || '프로젝트 내용',
      },
    };

    try {
      if (isEditing) {
        const res = await axiosInstance.patch(`/api/v1/spec/${id}`, value);
        console.log(res);
        console.log(`/api/v1/spec/${id}`, res);
      } else {
        const res = await axiosInstance.post(`/api/v1/spec/json`, value);
        console.log(`/api/v1/spec`, res);
      }
      navigation.navigate('SpecAddComplete', { name });
    } catch (error) {
      console.error('Error 에러:', error);
      Alert.alert(
        '양식을 제출하는 동안 오류가 발생했습니다. 다시 시도해 주세요.',
      );
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* 인턴 정보 입력 */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollViewContent}>
        {/* 페이지 인디케이터 */}
        <View style={styles.pageIndicator}>
          <Text style={styles.currentPage}>2</Text>
          <Text style={styles.totalPages}>/2</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginTop: 45 }]}>
            해당 인턴의 세부 정보를 입력해주세요.
          </Text>
        </View>
        {/* 섹션 1: 지원 경로 입력 */}
        <View style={styles.section}>
          <Text style={[styles.sectionSubtitle, { marginTop: 10 }]}>
            인턴 지원 경로를 입력해주세요.
          </Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>지원 경로</Text>
            <TextInput
              style={styles.inputText}
              placeholder="지원 경로를 입력해주세요."
              value={motivation || ''}
              onChangeText={text => setMotivation(text)}
            />
          </View>
        </View>
        {/* 섹션 2: 입사 전 목표 입력 */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>
            입사 전 목표를 기록해주세요.
          </Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>목표</Text>
            <TextInput
              style={styles.inputText}
              placeholder="목표를 기록해주세요."
              value={goal || ''}
              onChangeText={text => setGoal(text)}
            />
          </View>
        </View>
        {/* 섹션 3: 프로젝트 입력 */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>
            참여한 프로젝트의 내용을 기록해주세요.
          </Text>
          <View
            style={[
              styles.inputBox,
              { marginBottom: keyboardHeight }, // 키보드 높이만큼 입력 박스를 올림
            ]}>
            <Text style={styles.inputLabel}>프로젝트</Text>
            <TextInput
              style={styles.inputText}
              placeholder="프로젝트의 내용을 기록해주세요."
              value={project || ''}
              onChangeText={text => setProject(text)}
            />
          </View>
        </View>
        {/* 섹션 4: 증빙자료 업로드 */}
        {/* <View style={styles.section}>
          <Text style={[styles.sectionSubtitle, { marginTop: 10 }]}>
            증빙자료를 업로드해주세요.
          </Text>
          <TouchableOpacity
            style={[styles.inputBox, { width: 110 }]}
            onPress={pickDocument}
          >
            <View>
              <Text style={styles.inputText}>파일 업로드</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      {/* 다음으로 버튼 */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>다음으로</Text>
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
    marginLeft: 0,
  },
  pageIndicator: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    right: 10,
  },
  pageText: {
    color: '#0094FF',
    fontSize: 14,
    fontWeight: '600',
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
  section: {
    width: 320,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#373737',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSubtitle: {
    color: '#373737',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  datePicker: {
    flex: 1,
    padding: 13,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginRight: 10,
  },
  datePickerLabel: {
    color: '#9F9F9F',
    fontSize: 10,
    fontWeight: '400',
  },
  datePickerText: {
    marginTop: 5,
    color: '#C1C1C1',
    fontSize: 16,
    fontWeight: '400',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  inputBox: {
    paddingVertical: 12,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    width: '100%',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  inputLabel: {
    color: '#9F9F9F',
    fontSize: 10,
    fontWeight: '400',
    marginBottom: 5,
  },
  inputText: {
    color: '#C1C1C1',
    fontSize: 16,
    fontWeight: '400',
  },
  nextButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#0094FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '90%',
    height: 50, // 높이 조절
  },
  nextButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // 키보드가 나타날 때 입력란이 가려지지 않도록 하기 위한 여분의 공간
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 투명한 검은 배경
  },
  calendarModal: {
    backgroundColor: 'white', // 달력이 표시되는 박스 배경색
    marginHorizontal: 20, // 모달 창과 달력 사이의 여백
    borderRadius: 10, // 모달 창과 달력의 모서리를 둥글게 만듦
    paddingBottom: 20, // 하단 여백
  },
});

export default InternAdd2;
