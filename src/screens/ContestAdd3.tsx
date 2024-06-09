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
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ContestAddScreenStackParamList } from '@stackNav/ContestAddScreen';
import { Dropdown } from 'react-native-element-dropdown';
import axiosInstance from 'src/api/axiosInstance';

type ContestProps = NativeStackScreenProps<
  ContestAddScreenStackParamList,
  'ContestAdd3'
>;

function ContestAdd3({ route, navigation }: Readonly<ContestProps>) {
  const { id, specDetail, name, host, startDate, endDate, field, contents } =
    route.params || {}; // id 추가
  const [awardTitle, setAwardTitle] = useState(
    specDetail?.detail?.awardTitle ?? '',
  );
  const [date, setDate] = useState<Date | string | null>(
    specDetail?.detail?.date ?? null,
  );
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [awardStatus, setAwardStatus] = useState<boolean | null>(
    specDetail?.detail?.awardStatus ?? null,
  ); // 공모전 수상여부
  const [proofFile, setProofFile] = useState<string | null>(null);

  const isEditing = !!id; // id가 있으면 수정 모드

  const handleNext = async () => {
    const value = {
      name: name || '기본 이름',
      category: 'CONTEST',
      startDate: startDate || '2024-03-06',
      endDate: endDate || '2024-10-06',
      contents: contents || '기본 내용',
      detail: {
        host: host || '기본 주최자',
        field: field || 'IDEATION',
        awardStatus: awardStatus || false,
        awardTitle: awardTitle || '기본 상이름',
        date: date || '2024-07-06',
      },
    };

    try {
      if (isEditing) {
        const res = await axiosInstance.patch(`/api/v1/spec/${id}`, value);
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

  const formatDate = (date: Date | null): string => {
    if (!date) return '날짜 선택';
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor: '#FCFCFE' }}>
        {/* 페이지 인디케이터 */}
        <View style={styles.pageIndicator}>
          <Text style={styles.currentPage}>3</Text>
          <Text style={styles.totalPages}>/3</Text>
        </View>
        {/* 공모전 정보 입력 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginTop: 45 }]}>
            해당 공모전의 세부 정보를 입력해주세요.
          </Text>
        </View>
        {/* 섹션 1: 공모전 수상 여부 선택 */}
        <View style={styles.section}>
          <Text style={[styles.sectionSubtitle, { marginTop: 10 }]}>
            공모전 수상 여부를 선택해주세요.
          </Text>
          <View style={{ ...styles.inputBox, paddingVertical: 5 }}>
            <Dropdown
              style={{ width: '100%' }}
              placeholderStyle={styles.inputText}
              selectedTextStyle={[styles.inputText, { color: '#373737' }]}
              data={[
                { label: '수상', value: 'true' },
                { label: '수상하지 않음', value: 'false' },
              ]}
              placeholder={'수상 여부를 선택해주세요.'}
              value={awardStatus?.toString()} // 선택된 값이 null일 수 있으므로 toString() 함수를 사용하여 문자열로 변환
              onChange={item =>
                setAwardStatus(
                  item.value === 'true'
                    ? true
                    : item.value === 'false'
                    ? false
                    : null,
                )
              } // 문자열로 저장된 값을 다시 boolean 형태로 변환
              labelField={'label'}
              valueField={'value'} // 수정된 부분
            />
          </View>
        </View>

        {/* 섹션 2: 수상명 입력 */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>수상명을 입력해주세요.</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>수상명</Text>
            <TextInput
              style={styles.inputText}
              placeholder="수상명을 입력해주세요."
              value={awardTitle}
              onChangeText={text => setAwardTitle(text)}
            />
          </View>
        </View>

        {/* 섹션 3: 수상 일자 선택 */}
        <View style={styles.section}>
          <Text style={[styles.sectionSubtitle, { marginTop: 0 }]}>
            수상 일자를 선택해주세요.
          </Text>
          <View style={styles.datePickerRow}>
            <TouchableOpacity
              onPress={() => setIsStartDatePickerVisible(true)}
              style={styles.datePicker}>
              <Text style={styles.datePickerLabel}>수상일자</Text>
              <Text style={styles.datePickerText}>
                {typeof date === 'string' ? date : formatDate(date)}
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isStartDatePickerVisible || isEndDatePickerVisible}
            animationType="slide"
            transparent={true} // 배경을 투명하게 만듦
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalBackground} // 배경을 터치하면 모달이 닫히도록 함
                onPress={() => {
                  setIsStartDatePickerVisible(false);
                  setIsEndDatePickerVisible(false);
                }}
              />
              <View style={styles.calendarModal}>
                <CalendarPicker
                  // minDate={new Date()} // 과거 날짜를 선택할 수 없도록 함
                  onDateChange={date => {
                    if (isStartDatePickerVisible) {
                      setDate(date);
                      setIsStartDatePickerVisible(false);
                    }
                  }}
                />
              </View>
            </View>
          </Modal>
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
    right: 0,
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
    height: 50, // 높이 조 절
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  switchText: {
    marginRight: 10,
  },
});

export default ContestAdd3;
