import React, { useState, useEffect } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InternAddScreenStackParamList } from '@stackNav/InternAddScreen';
import { Dropdown } from 'react-native-element-dropdown';
import getDateString from 'src/utils/getDateString';

type InternProps = NativeStackScreenProps<
  InternAddScreenStackParamList,
  'InternAdd1'
>;

function InternAdd1({ route, navigation }: Readonly<InternProps>) {
  const { id, specDetail } = route.params;
  const [company, setCompany] = useState<string>(
    specDetail?.detail?.company ?? '',
  );
  const [work, setWork] = useState(specDetail?.detail?.work ?? '');
  const [startDate, setStartDate] = useState<Date | string | null>(
    specDetail?.startDate ?? null,
  );
  const [endDate, setEndDate] = useState<Date | string | null>(
    specDetail?.endDate ?? null,
  );
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [contents, setContents] = useState<string>(specDetail?.contents ?? '');
  const [modalVisible, setModalVisible] = useState(false); // 모달 가시성 상태
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleNext = async () => {
    const value = {
      id,
      name: `${company} 인턴`,
      specDetail,
      company,
      work,
      startDate: startDate
        ? typeof startDate === 'object'
          ? getDateString(startDate)
          : startDate
        : '',
      endDate: endDate
        ? typeof endDate === 'object'
          ? getDateString(endDate)
          : endDate
        : '',
      contents,
    };
    console.log('InternAdd1 -> InternAdd2', value);
    navigation.navigate('InternAdd2', value);
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

  const formatDate = (date: Date | null): string => {
    if (!date) return '날짜 선택';
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  return (
    <View style={styles.container}>
      {/* 인턴 정보 입력 */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollViewContent}>
        {/* 페이지 인디케이터 */}
        <View style={styles.pageIndicator}>
          <Text style={styles.currentPage}>1</Text>
          <Text style={styles.totalPages}>/2</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginTop: 45 }]}>
            어떤 인턴인가요?
          </Text>
        </View>
        {/* 섹션 1: 기업명 입력 */}
        <View style={styles.section}>
          <Text style={[styles.sectionSubtitle, { marginTop: 10 }]}>
            기업명을 입력해주세요.
          </Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>기업명</Text>
            <TextInput
              style={styles.inputText}
              placeholder="기업명을 입력해주세요."
              value={company}
              onChangeText={text => setCompany(text)}
            />
          </View>
        </View>
        {/* 섹션 2: 부서/직무 입력 */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>부서/직무를 입력해주세요.</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>부서/직무</Text>
            <TextInput
              style={styles.inputText}
              placeholder="부서/직무을 입력해주세요."
              value={work}
              onChangeText={text => setWork(text)}
            />
          </View>
        </View>
        {/* 섹션 3: 인턴 재직 기간 */}
        <View style={styles.section}>
          <Text style={[styles.sectionSubtitle, { marginTop: 0 }]}>
            인턴 재직 기간을 선택해주세요.
          </Text>
          <View style={styles.datePickerRow}>
            <TouchableOpacity
              onPress={() => setIsStartDatePickerVisible(true)}
              style={styles.datePicker}>
              <Text style={styles.datePickerLabel}>시작날짜</Text>
              <Text style={styles.datePickerText}>
                {typeof startDate === 'string'
                  ? startDate
                  : formatDate(startDate)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEndDatePickerVisible(true)}
              style={styles.datePicker}>
              <Text style={styles.datePickerLabel}>종료날짜</Text>
              <Text style={styles.datePickerText}>
                {typeof endDate === 'string' ? endDate : formatDate(endDate)}
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isStartDatePickerVisible || isEndDatePickerVisible}
            animationType="slide"
            transparent={true}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalBackground}
                onPress={() => {
                  setIsStartDatePickerVisible(false);
                  setIsEndDatePickerVisible(false);
                }}
              />
              <View style={styles.calendarModal}>
                <CalendarPicker
                  onDateChange={date => {
                    if (isStartDatePickerVisible) {
                      setStartDate(date);
                      setIsStartDatePickerVisible(false);
                    } else if (isEndDatePickerVisible) {
                      setEndDate(date);
                      setIsEndDatePickerVisible(false);
                    }
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
        {/* 섹션 3: 인턴 상세 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>
            재직 관련 상세 정보를 자유롭게 입력해주세요.
          </Text>
          <View
            style={[
              styles.inputBox,
              { marginBottom: keyboardHeight }, // 키보드 높이만큼 입력 박스를 올림
            ]}>
            <Text style={styles.inputLabel}>상세정보</Text>
            <TextInput
              style={styles.inputText}
              placeholder="상세정보를 입력해주세요."
              multiline={true}
              numberOfLines={4}
              value={contents || ''}
              onChangeText={text => setContents(text)} // contents 상태 업데이트
              returnKeyType="done"
            />
          </View>
        </View>
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

export default InternAdd1;
