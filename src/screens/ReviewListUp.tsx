import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { CustomText as Text } from '@components/CustomText';
import Button from '@components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReviewListScreenStackParamList } from '@stackNav/ReviewListScreen';
import ChevronBottom from '@assets/images/chevron-bottom-black.svg';
import AddIcon from '@assets/images/add-blue.svg';
import { CATEGORY_LABEL } from './Spec';
import { SORT_MENU } from './ReviewList';
import ReviewDetail from '@components/ReviewDetail';
import axiosInstance from 'src/api/axiosInstance';

interface ReviewBase {
  reviewId: number;
  specId: number;
  specName: string;
  category: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  date: string;
  dplusDay: number;
}
// const data = [
//   {
//     reviewId: 1,
//     specId: 1,
//     specName: '정보처리기사',
//     category: 'certificate',
//     startDate: '2024-03-06',
//     endDate: '2024-04-10',
//     completed: false,
//     date: '2024-03-06',
//     dplusDay: 4,
//   },
//   {
//     reviewId: 2,
//     specId: 1,
//     specName: '정보처리기사',
//     category: 'certificate',
//     startDate: '2024-03-06',
//     endDate: '2024-04-10',
//     completed: false,
//     date: '2024-03-06',
//     dplusDay: 4,
//   },
// ];

export type ReviewListScreenProps = NativeStackScreenProps<
  ReviewListScreenStackParamList,
  'ReviewListUp'
>;

function ReviewListUp({ route, navigation }: Readonly<ReviewListScreenProps>) {
  const [loading, setLoading] = useState(true);
  const { specItem } = route.params;
  const [reviewList, setReviewList] = useState<ReviewBase[]>([]);
  const [selectedSort, setSelectedSort] = useState(0);
  const [sortOpen, setSortOpen] = useState(false);
  const sortIdx = useRef(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(0);

  const ToggleButton = () => {
    return (
      <Pressable
        className="flex-row items-center justify-end mr-[15]"
        onPress={() => setSortOpen(prev => !prev)}>
        <Text className="text-[#1C1C1E] font-[Inter-Medium] mr-[5]" size={12}>
          {SORT_MENU[selectedSort].label}
        </Text>
        <View
          className={`w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-[#1C1C1E] transition-all transform ${
            sortOpen ? '' : 'rotate-180'
          }`}
        />
      </Pressable>
    );
  };

  const getReviewList = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/api/v1/review/spec/${SORT_MENU[selectedSort].path}/${specItem.specId}`,
      );
      console.log(
        `/review/spec/${SORT_MENU[selectedSort].path}/${specItem.specId}`,
        res,
      );
      // setReviewList(data);
      setReviewList(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviewList();
  }, []);

  useEffect(() => {
    if (sortOpen) return;
    const isOn = selectedSort !== sortIdx.current;
    if (isOn) {
      // initPage();
      getReviewList();
      sortIdx.current = selectedSort;
    }
  }, [sortOpen]);

  return (
    <View className="flex-1 relative">
      <View className="py-[28] px-[19]">
        <Button
          label="회고 추가하기"
          callbackFn={() => navigation.navigate('ReviewAdd', { specItem })}
        />
      </View>

      <View className="py-[19] px-[19] border-y border-y-[#ECEBEB]">
        <View className="flex-row justify-between items-center">
          <View>
            <View className="flex-row items-center">
              <View className="flex-col justify-between">
                <View className="flex-row justify-start items-center mb-[6.5]">
                  <Text
                    className="font-[Inter-SemiBold] h-full mr-[6]"
                    size={18}>
                    {specItem?.name}
                  </Text>
                  <Text className="text-[#AEAEB2]" size={10}>
                    {CATEGORY_LABEL[specItem?.category]}
                  </Text>
                </View>
                <Text className="text-[#636366]" size={12}>
                  {specItem?.startDate} ~ {specItem?.endDate}
                </Text>
              </View>
            </View>
          </View>
          <View
            className={`justify-center items-center w-[55] h-[22] ${
              specItem?.completed ? 'bg-[#EAF4FF]' : 'bg-[#EFEFEF]'
            }`}
            style={{ borderRadius: 4 }}>
            <Text
              className={`font-[Inter-SemiBold] ${
                specItem?.completed ? 'text-[#0069CF]' : 'text-[#9F9F9F]'
              }`}
              size={12}>
              {specItem?.completed ? '완료' : '진행중'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="pt-[23] pb-[50] px-[19]">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Text
                className="font-[Inter-SemiBold] text-[#373737] mr-[9]"
                size={20}>
                나의 회고 기록
              </Text>
              <Text className="text-[#979797]" size={18}>
                {`${reviewList.length}`}
              </Text>
            </View>
            <ToggleButton />
          </View>

          <View className="py-[23]">
            {loading ? (
              <View className="items-center py-[50]">
                <Image
                  source={require('@assets/images/loader-spinner.gif')}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            ) : reviewList.length === 0 ? (
              <View className="items-center py-[50]">
                <Text size={14}>아직 회고가 없습니다.</Text>
              </View>
            ) : (
              reviewList.map(item => (
                <View
                  key={`${item.specId}-${item.reviewId}`}
                  className="justify-between border border-[#DEDEDE] pt-[17] pb-[13] px-[16] mb-[23]"
                  style={{ borderRadius: 10 }}>
                  <View className="mb-[7]">
                    <View className="flex-row items-center justify-between border-b border-[#EFEFEF] pb-[7]">
                      <Text className="text-[#636366]" size={12.3}>
                        {item.date}
                      </Text>
                      <Text
                        className="font-[Inter-Medium] text-[#0094FF]"
                        size={18}>
                        D+{`${item.dplusDay}`}
                      </Text>
                    </View>
                  </View>

                  <Pressable
                    className="flex-row items-center justify-center"
                    onPress={() => {
                      setIsDetailOpen(true);
                      setSelectedReviewId(item.reviewId);
                    }}>
                    <Text
                      className="font-[Inter-Medium] text-[#373737] mr-[12]"
                      size={12}>
                      회고 펼쳐보기
                    </Text>
                    <ChevronBottom />
                  </Pressable>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <Pressable
        className="absolute right-[22] bottom-[22]"
        onPress={() => navigation.navigate('ReviewAdd', { specItem })}>
        <AddIcon />
      </Pressable>

      <Pressable
        className={`absolute top-0 left-0 w-full h-full z-20 bg-black/30 ${
          sortOpen || 'hidden'
        }`}
        onPress={() => setSortOpen(false)}>
        <View id="dropdown" className="absolute bottom-0 left-0 w-full">
          <View className="flex flex-col pt-[6px] pb-[14px] h-[272px] rounded-t-[20px] bg-white shadow-t-gray">
            <View className="self-center w-[53px] h-[4px] bg-[#D5D8DC] rounded-[2px] mb-[16px]" />
            <View className="py-[7.5px] px-[22px]">
              <Text className="font-[Inter-Medium] text-[#9E9E9E]" size={13}>
                정렬
              </Text>
            </View>
            {SORT_MENU.map(v => (
              <Pressable
                key={v.idx}
                className={`py-[12px] px-[22px] w-full`}
                onPress={() => setSelectedSort(v.idx)}>
                <Text
                  className={`text-start ${
                    selectedSort === v.idx
                      ? 'text-[#0094FF] font-[Inter-SemiBold]'
                      : 'font-[Inter-Medium] text-[#5A5E6A]'
                  }`}
                  size={14}>
                  {v.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Pressable>

      <Pressable
        className={`absolute top-0 left-0 w-full h-full z-20 bg-black/30 ${
          isDetailOpen || 'hidden'
        }`}>
        <ReviewDetail
          setIsDetailOpen={setIsDetailOpen}
          reviewId={selectedReviewId}
          navigation2={navigation}
          specItem={specItem}
        />
      </Pressable>
    </View>
  );
}

export default ReviewListUp;
