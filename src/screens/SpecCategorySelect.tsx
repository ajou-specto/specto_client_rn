import * as React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import CloseIcon from '@assets/images/x-blue.svg';
import { useNavigation } from '@react-navigation/native';

interface SpecCategorySelectProps {
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

const SpecCategorySelect: React.FC<SpecCategorySelectProps> = ({
  onClose,
  onSelectCategory,
}) => {
  const navigation = useNavigation<any>(); // 내비게이션 객체 생성

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.categoryButton}
        onPress={() => {
          navigation.navigate('ContestAddScreen', {
            screen: 'ContestAdd1',
            params: {},
          });
          onSelectCategory('공모전/수상');
          onClose();
        }}>
        <Text style={styles.buttonText}>공모전/수상</Text>
      </Pressable>
      <Pressable
        style={styles.categoryButton}
        onPress={() => {
          navigation.navigate('CertificateAddScreen', {
            screen: 'CertificateAdd1',
            params: {},
          });
          onClose();
          onSelectCategory('자격증');
        }}>
        <Text style={styles.buttonText}>자격증</Text>
      </Pressable>
      <Pressable
        style={styles.categoryButton}
        onPress={() => {
          navigation.navigate('InternAddScreen', {
            screen: 'InternAdd1',
            params: {},
          });
          onClose();
          onSelectCategory('인턴');
        }}>
        <Text style={styles.buttonText}>인턴</Text>
      </Pressable>
      <Pressable
        style={styles.categoryButton}
        onPress={() => {
          navigation.navigate('ActivityAddScreen', {
            screen: 'ActivityAdd1',
            params: {},
          });
          onSelectCategory('대외활동');
          onClose();
        }}>
        <Text style={styles.buttonText}>대외활동</Text>
      </Pressable>
      <Pressable
        style={styles.categoryButton}
        onPress={() => {
          navigation.navigate('ProjectAddScreen', {
            screen: 'ProjectAdd1',
            params: {},
          });
          onSelectCategory('논문/프로젝트');
          onClose();
        }}>
        <Text style={styles.buttonText}>논문/프로젝트</Text>
      </Pressable>
      {/* X 버튼 */}
      <Pressable style={styles.closeButton} onPress={onClose}>
        <CloseIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'transparent', // 투명 배경색으로 설정하여 테두리 없앰
  },
  buttonText: {
    color: '#FFFFFF', // 흰색 텍스트 색상
    fontWeight: 'bold',
    fontSize: 22,
  },
  closeButton: {
    marginTop: 30,
  },
});

export default SpecCategorySelect;
