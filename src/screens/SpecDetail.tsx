import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { CustomText as Text } from '@components/CustomText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SpecScreenStackParamList } from '@stackNav/SpecScreen';
import { LineChart } from 'react-native-chart-kit';
import { Text as TextSVG } from 'react-native-svg';
import { Circle } from 'react-native-svg';
import { CATEGORY_LABEL, renderSpecIcon } from './Spec';
import axiosInstance from 'src/api/axiosInstance';

const screenWidth = Dimensions.get('window').width;

type SpecDetailScreenProps = NativeStackScreenProps<
  SpecScreenStackParamList,
  'SpecDetail'
>;

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 1,
  fillShadowGradientFromOpacity: 0,
  fillShadowGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
  strokeWidth: 5,
  barPercentage: 0.5,
  propsForVerticalLabels: {
    fontSize: 11,
    fontWeight: '500',
    color: '#7B7B7B',
  },
};

const data = {
  labels: ['1월 첫째주', '1월 둘째주', '1월 셋째주', '1월 넷째주'],
  datasets: [
    {
      data: [20, 50, 80, 100],
      color: (opacity = 1) => `rgba(224, 224, 224, ${opacity})`,
      strokeWidth: 3,
    },
  ],
};

export const CATEGORY_DETAIL_MENU = {
  CONTEST: [
    'host',
    'field',
    'awardStatus',
    'awardTitle',
    { key: 'date', label: '수상일자' },
    // "documentation",
  ],
  CERTIFICATION: [
    'host',
    'field',
    { key: 'date', label: '취득 날짜' },
    // "documentation",
  ],
  INTERNSHIP: [
    'company',
    'work',
    'motivation',
    'goal',
    'project',
    // "documentation",
  ],
  ACTIVITY: [
    'host',
    'field',
    { key: 'motivation', label: '활동 배경' },
    { key: 'goal', label: '활동 목표' },
    'direction',
    // "documentation",
  ],
  PROJECT: [
    'host',
    'field',
    { key: 'motivation', label: '활동 배경' },
    { key: 'goal', label: '활동 목표' },
    'direction',
    // "documentation",
  ],
};

export const DETAIL_MENU: { [key: string]: string } = {
  host: '주최 기관',
  field: '분야',
  awardStatus: '수상 여부',
  awardTitle: '수상명',
  date: '수상일자',
  // documentation: "증빙자료",
  company: '기업명',
  work: '직무',
  motivation: '지원 경로',
  goal: '입사 전 목표',
  project: '프로젝트 내용',
  direction: '방향성',
};

export interface SpecDetailDetailBase {
  host: string;
  field: string;
  awardStatus: boolean;
  awardTitle: string;
  date: string;
  documentation: string;
  company: string;
  work: string;
  motivation: string;
  goal: string;
  project: string;
  direction: string;
}

export interface SpecDetailBase {
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  contents: string;
  summary: string;
  detail: SpecDetailDetailBase;
}

const SpecDetail = ({ route, navigation }: Readonly<SpecDetailScreenProps>) => {
  const { id, category } = route.params;
  const [specInfo, setSpecInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState('');
  const [gptLoading, setGptLoading] = useState(false);

  const handleEditPress = (id: number | undefined) => {
    try {
      switch (category) {
        case 'CONTEST':
          navigation.navigate('ContestAddScreen', {
            screen: 'ContestAdd1',
            params: { id, specDetail: specInfo },
          });
          break;
        case 'CERTIFICATION':
          navigation.navigate('CertificateAddScreen', {
            screen: 'CertificateAdd1',
            params: { id, specDetail: specInfo },
          });
          break;
        case 'INTERNSHIP':
          navigation.navigate('InternAddScreen', {
            screen: 'InternAdd1',
            params: { id, specDetail: specInfo },
          });
          break;
        case 'ACTIVITY':
          navigation.navigate('ActivityAddScreen', {
            screen: 'ActivityAdd1',
            params: { id, specDetail: specInfo },
          });
          break;
        case 'PROJECT':
          navigation.navigate('ProjectAddScreen', {
            screen: 'ProjectAdd1',
            params: { id, specDetail: specInfo },
          });
          break;
        default:
          // navigation.navigate("Spec", { id });
          break;
      }
    } catch (error) {
      console.error('Error updating spec:', error);
      Alert.alert('수정 실패', '스펙 수정에 실패했습니다.');
    }
  };

  const handleDeletePress = async () => {
    try {
      await axiosInstance.delete(`/api/v1/spec/${id}`);
      Alert.alert('삭제 완료', '스펙이 성공적으로 삭제되었습니다.');
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      console.error('Error deleting spec:', error);
      Alert.alert('삭제 실패', '스펙 삭제에 실패했습니다.');
    }
  };

  const handleReviewCreate = async () => {
    Alert.alert('준비 중인 기능입니다. 잠시만 기다려 주세요!');
    // try {
    //   setGptLoading(true);
    //   const res = await axiosInstance.post(`/api/v1/chatGpt/prompt`, {
    //     prompt:
    //       '이번 패스트 인턴을 통해서 기본적인 수준에서 벗어나 레벨업을 하기 위해 익히면 좋을 만한 프론트 엔드 기술들을 새롭게 익힐 수 있었다. 고급 JavaScript의 일환으로 비동기 프로그래밍을 새롭게 연습했다. Async/Await 뿐만 아니라 Promises까지 다루어 보았고 클로저, 고차 함수와 같은 개념들도 책을 통해 학습했다. 또한 타입스크립트를 추가하여 JavaScript에 정적 타입을 추가하였고 이를 통해 코드를 보호하고 유지보수성을 향상시킬 수 있었다. 이후에는 MobX와 같은 상태 관리 라이브러리를 사용해서 복잡한 애플리케이션 상태를 관리하는 연습을 해보았고, 엔드투엔드 테스트를 작성하여 React Testing 라이브러리를 사용해 유닛, 통합 테스트를 추가로 진행했다. 마지막으로 코드 스플리팅, 지연 로딩, 캐싱 전략 등에 관한 강의를 듣고 애플리케이션의 퍼포먼스를 최적화하는 데에 도전해 보았다. 단순히 프로그램이 정상적으로 돌아가는 것만을 목표로 하는 개발이 아니라 더 효율적이고 안정된 애플리케이션을 목표로 하다보니 낯설고 어려운 점들이 많았지만, 전문성을 기르는 과정이라 생각하니 얻은 것이 많은 인턴 경험이었던 것 같다. 다음 번에는 가능하다면 이번 인턴 활동을 통해 얻은 지식들을 가지고 지금보다 4배수 이상의 많은 유저가 접속하는 프로그램의 애플리케이션 프론트 엔드를 작성해 볼 수 있었으면 좋겠다',
    //   });
    //   console.log(res);
    //   setSummary(res.data.content);
    // } catch (error) {
    //   console.error('Error:', error);
    //   Alert.alert('회고 생성 실패', '회고 생성에 실패했습니다.');
    // } finally {
    //   setGptLoading(false);
    // }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <Pressable
            style={styles.editButton}
            onPress={() => handleEditPress(route.params.id)}>
            <Text style={styles.editButtonText}>수정</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleDeletePress}>
            <Text style={styles.deleteButtonText}>삭제</Text>
          </Pressable>
        </View>
      ),
    });
  }, [navigation, specInfo]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <Pressable
            style={styles.editButton}
            onPress={() => handleEditPress(route.params.id)}>
            <Text style={styles.editButtonText}>수정</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleDeletePress}>
            <Text style={styles.deleteButtonText}>삭제</Text>
          </Pressable>
        </View>
      ),
    });
  }, [navigation, specInfo]);

  useEffect(() => {
    const fetchSpecDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/spec/${id}`);
        setSpecInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching spec detail:', error);
        setLoading(false);
      }
    };
    fetchSpecDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.iconContainer}>
            {renderSpecIcon(category)}
            <Text style={styles.categoryText}>{CATEGORY_LABEL[category]}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor: specInfo.completed ? '#EAF4FF' : '#EFEFEF',
                },
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color: specInfo.completed ? '#0069CF' : '#9F9F9F',
                  },
                ]}>
                {specInfo.completed ? '완료' : '진행중'}
              </Text>
            </View>
            <Pressable
              style={styles.myReviewButton}
              onPress={() =>
                navigation.navigate('ReviewListScreen', {
                  screen: 'ReviewListUp',
                  params: { specItem: { ...specInfo, specId: id } },
                })
              }>
              <Text style={styles.editButtonText}>내 회고 &gt;</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.innerDetailContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.detailSubTitle}>상세소개</Text>
              <Text style={styles.detailTitle}>{specInfo.name}</Text>
              <Text style={[styles.detailText, { marginBottom: 30 }]}>
                {specInfo.startDate} ~ {specInfo.endDate}
              </Text>
              {CATEGORY_DETAIL_MENU[
                category.toUpperCase() as keyof typeof CATEGORY_DETAIL_MENU
              ].map((item: string | { key: string; label: string }) => (
                <View style={styles.detailRow} key={`${Math.random()}`}>
                  <Text style={styles.detailLabel}>
                    {typeof item === 'string' ? DETAIL_MENU[item] : item.label}
                  </Text>
                  <Text style={styles.detailText}>
                    {typeof item === 'string'
                      ? specInfo.detail && specInfo.detail[item]
                      : specInfo.detail && specInfo.detail[item.key]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.separator} />
          <View style={styles.titleContainer}>
            <Text style={styles.summaryTitle}>
              {/* {specInfo.user}님의 {specInfo.name} */}
              {`김철수`}님의 {specInfo.name}
            </Text>
            <Pressable style={styles.createButton} onPress={handleReviewCreate}>
              <Text style={styles.createButtonText}>생성하기</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.innerDetailContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.detailSubTitle}>요약내용: </Text>
              {gptLoading ? (
                <View className="w-full items-center justify-center">
                  <Image
                    source={require('@assets/images/loader-spinner.gif')}
                    style={{ width: 50, height: 50 }}
                  />
                </View>
              ) : (
                <Text style={styles.summarycontentContainer}>
                  {specInfo.summary ?? summary}
                </Text>
              )}
            </View>
          </View>
          {/* <Text
            style={{
              width: "100%",
              color: "#373737",
              fontSize: 16,
              fontFamily: "Inter-SemiBold",
              fontWeight: "600",
              paddingTop: 40,
              marginLeft: 45,
            }}
          >
            진행상황 히스토리
          </Text>
          <View style={[styles.group, { paddingHorizontal: 0 }]}>
            <LineChart
              data={data}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              withVerticalLines={false}
              withHorizontalLabels={false}
              fromZero={true}
              renderDotContent={({ x, y, index }) => {
                const dataValue = data.datasets[0].data[index];
                let dotColor = "#FFFFFF";
                let strokeColor = "#0094FF";
                if (dataValue <= 50) {
                  dotColor = "#FFFFFF";
                  strokeColor = "#FF0909";
                }
                return (
                  <View key={`${Math.random()}`}>
                    <Circle
                      key={`circle-${Math.random()}`}
                      cx={x}
                      cy={y}
                      r={6}
                      stroke={strokeColor}
                      strokeWidth={3}
                      fill={dotColor}
                    />
                    <TextSVG
                      key={`text-${Math.random()}`}
                      x={x}
                      y={y + 20}
                      fill="#7B7B7B"
                      fontSize="11"
                      fontWeight="normal"
                      textAnchor="middle"
                    >
                      {data.datasets[0].data[index]}%
                    </TextSVG>
                  </View>
                );
              }}
            />
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  group: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonsContainer: {
    flexDirection: 'row',
  },
  myReviewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0094FF',
    borderRadius: 4,
    width: 69,
    height: 22,
    marginLeft: 10,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0094FF',
    borderRadius: 4,
    width: 60,
    height: 22,
    marginLeft: 10,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0909',
    borderRadius: 4,
    width: 60,
    height: 22,
    marginLeft: 10,
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  deleteButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    marginTop: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 10,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0094FF',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 22,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  detailContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  innerDetailContainer: {
    width: '90%',
    marginTop: 10,
  },
  detailBox: {
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  detailSubTitle: {
    fontSize: 10,
    color: '#9F9F9F',
    marginBottom: 5,
  },
  detailTitle: {
    marginBottom: 5,
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  detailText: {
    marginBottom: 5,
    marginRight: 90,
    fontFamily: 'Inter-Regular',
    fontSize: 13,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    marginRight: 20,
    width: 80,
    textAlign: 'left',
  },
  summaryContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  summarycontentContainer: { fontSize: 15 },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#EFEFEF',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#0094FF',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    marginTop: 15,
  },
});

export default SpecDetail;
