import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { MyPageScreenStackParamList } from '@stackNav/MyPageScreen';
import { RootStackParamList } from 'AppInner';
import { useNavigation } from '@react-navigation/native';

type MyPageProps = NativeStackScreenProps<MyPageScreenStackParamList, 'MyPage'>;
type RootProps = NativeStackNavigationProp<RootStackParamList>;

function MyPage({ navigation }: MyPageProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [showConfirmationButtons, setShowConfirmationButtons] = useState(false);
  const navigationRoot = useNavigation<RootProps>();

  const handle1to1InquiryPress = () => {
    setPopupTitle('1:1 문의');
    setPopupDescription(
      '하단 이메일로 문의 내역을 작성해 보내주세요! \n관리자가 24시간 이내 회신 드릴 예정입니다.\n\n파란색 박스를 누르면 주소가 복사돼요!',
    );
    setShowEmailBox(true);
    setShowConfirmationButtons(false);
    setShowPopup(true);
  };

  const handleLogoutPress = () => {
    setPopupTitle('로그아웃');
    setPopupDescription('정말로 로그아웃 하시겠습니까?');
    setShowEmailBox(false);
    setShowConfirmationButtons(true);
    setShowPopup(true);
  };

  const handleServiceWithdrawalPress = () => {
    setPopupTitle('서비스 탈퇴');
    setPopupDescription(
      '한 번 탈퇴하면, 회원님의 정보를 모두 잃게 됩니다.\n정말 서비스를 탈퇴하시나요?',
    );
    setShowEmailBox(false);
    setShowConfirmationButtons(true);
    setShowPopup(true);
  };

  const handleCancelLogout = () => {
    setShowPopup(false);
  };

  const handleConfirmLogout = async () => {
    // 로그아웃 처리를 수행하는 코드를 추가하세요.
    await EncryptedStorage.removeItem('accessToken');
    await EncryptedStorage.removeItem('refreshToken');
    navigationRoot.navigate('Auth', { screen: 'Login' });
  };

  const handleCancelServiceWithdrawal = () => {
    setShowPopup(false);
  };

  const handleConfirmServiceWithdrawal = () => {
    // 서비스 탈퇴 처리를 수행하는 코드를 추가하세요.
    Alert.alert('서비스 준비 중입니다. 잠시만 기다려 주세요!');
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePrivacy = () => {
    navigation.navigate('Privacy');
  };

  const handleChangeProfile = () => {
    Alert.alert('서비스 준비 중입니다. 잠시만 기다려 주세요!');
    // navigation.navigate('ProfileChange');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>마이페이지</Text>
      <View style={styles.horizontalLine}></View>
      <View style={styles.greetingTextContainer}>
        <Text style={styles.greetingText}>안녕하세요 김철수님!</Text>
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileInfoItem}>
          <Text style={styles.profileText}>컴퓨터 활용능력</Text>
        </View>
        <Text style={styles.profileText}>자격증 D-5</Text>
      </View>
      <View style={styles.mainSeparator} />
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={handleChangeProfile}>
          <MenuItem text="프로필 정보 변경" top={240} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handle1to1InquiryPress}>
          <MenuItem text="1:1 문의" top={285} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrivacy}>
          <MenuItem text="개인정보처리방침" top={330} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogoutPress}>
          <MenuItem text="로그아웃" top={375} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleServiceWithdrawalPress}>
          <MenuItem text="서비스 탈퇴" top={420} />
        </TouchableOpacity>
      </View>
      {showPopup && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupContent}>
            <View style={styles.header}>
              <Text style={styles.title}>{popupTitle}</Text>
              <TouchableOpacity onPress={closePopup} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <Text style={styles.description}>{popupDescription}</Text>
            {showEmailBox && (
              <View style={styles.emailBox}>
                <Text style={styles.emailText}>wh101606@gmail.com</Text>
              </View>
            )}
            {showConfirmationButtons && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() =>
                    popupTitle === '로그아웃'
                      ? handleCancelLogout()
                      : handleCancelServiceWithdrawal()
                  }
                  style={[styles.button, styles.cancelButton]}>
                  <Text style={styles.buttonText}>아니오</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    popupTitle === '로그아웃'
                      ? handleConfirmLogout()
                      : handleConfirmServiceWithdrawal()
                  }
                  style={[styles.button, styles.confirmButton]}>
                  <Text style={styles.buttonText}>예</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const MenuItem = ({ text, top }: { text: string; top: number }) => (
  <View style={styles.menuItemContainer}>
    <Text style={[styles.menuItemText, { top }]}>{text}</Text>
    <View style={[styles.menuItemSeparator, { top: top + 29 }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFE',
    position: 'relative',
  },
  pageTitle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    marginTop: 67,
  },
  horizontalLine: {
    width: 390,
    height: 0,
    position: 'absolute',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEBEB',
    top: 102,
  },
  greetingTextContainer: {
    alignItems: 'center',
    position: 'absolute',
    left: 31,
    top: 150,
  },
  greetingText: {
    color: '#373737',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  profileInfoContainer: {
    alignSelf: 'center',
    position: 'absolute',
    width: 353,
    backgroundColor: '#0094FF',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 13,
    paddingBottom: 13,
    marginTop: 202,
  },
  profileInfoItem: {
    backgroundColor: '#87CEFA',
    marginRight: 8,
    borderRadius: 8,
    paddingLeft: 5,
    paddingRight: 5,
  },
  profileText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  mainSeparator: {
    width: 390,
    height: 6,
    position: 'absolute',
    backgroundColor: '#F3F2F2',
    top: 284,
  },
  menuContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    left: 31,
    top: 90,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  menuItemText: {
    color: '#373737',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    position: 'absolute',
  },
  menuItemSeparator: {
    width: 315,
    height: 3,
    position: 'absolute',
    backgroundColor: '#F3F2F2',
    left: 0,
  },
  popupOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center', // Center the content horizontally
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // "1:1 문의"를 왼쪽에, "X" 닫기 버튼을 오른쪽에 위치
    alignItems: 'center', // 세로로 가운데 정렬
  },
  emailBox: {
    width: '80%', // Adjusted to fit the content
    height: 35, // Adjusted for better spacing
    backgroundColor: '#0094FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Added margin bottom for spacing
  },
  emailText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    lineHeight: 22,
  },
  title: {
    color: 'black',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    textAlign: 'center', // Center the text
    flex: 1, // Take up available space in the row
  },
  description: {
    textAlign: 'center',
    color: 'black',
    fontSize: 13, // Increased font size for better visibility
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    marginTop: 20, // Added margin top for spacing
    marginBottom: 10,
  },
  separator: {
    width: '100%', // Adjusted to fit the content
    height: 3,
    backgroundColor: '#F3F2F2',
    marginTop: 15, // Added margin top for spacing
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // 예 아니오 버튼 간의 간격 조절
    marginTop: 20,
  },
  button: {
    width: 100,
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 5, // 예 아니오 버튼 사이의 간격 조절
  },
  cancelButton: {
    backgroundColor: '#D9D9D9',
  },
  confirmButton: {
    backgroundColor: '#0094FF',
  },
  buttonText: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    fontWeight: '600',
  },
});

export default MyPage;
