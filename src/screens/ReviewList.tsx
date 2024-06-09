import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { CustomText as Text } from '@components/CustomText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReviewListScreenStackParamList } from '@stackNav/ReviewListScreen';
import { SPEC_MENU, SpecBase } from './Spec';
import SpecListItem from '@components/SpecListItem';
import axiosInstance from 'src/api/axiosInstance';
import { useFocusEffect } from '@react-navigation/native';

export const SORT_MENU = [
  { idx: 0, label: '최근 등록순', path: 'recent' },
  { idx: 1, label: '오래된 순', path: 'oldest' },
  { idx: 2, label: '조회순', path: 'most' },
];

type ReviewListScreenProps = NativeStackScreenProps<
  ReviewListScreenStackParamList,
  'ReviewList'
>;

function ReviewList({ navigation }: Readonly<ReviewListScreenProps>) {
  const [loading, setLoading] = useState(true);
  const [clickedCategory, setClickedCategory] = useState(SPEC_MENU[0].category);
  const [specList, setSpecList] = useState<SpecBase[]>([]);
  const [selectedSort, setSelectedSort] = useState(0);
  const [sortOpen, setSortOpen] = useState(false);
  const sortIdx = useRef(0);

  const handleSpecClick = (specItem: SpecBase) => {
    navigation.navigate('ReviewListUp', { specItem });
  };

  const renderItem = ({ item }: { item: SpecBase }) => {
    return <SpecListItem item={item} callbackFn={handleSpecClick} />;
  };

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

  const getSpecList = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/api/v1/spec?category=${
          clickedCategory === 'ALL' ? '' : clickedCategory
        }&sortType=${SORT_MENU[selectedSort].path}`,
      );
      console.log(
        `/api/v1/spec?category=${
          clickedCategory === 'ALL' ? '' : clickedCategory
        }&sortType=${SORT_MENU[selectedSort].path}`,
        res,
      );
      // setSpecList(SPEC_DATA);
      setSpecList(res.data.content);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpecList();
  }, [clickedCategory]);

  useFocusEffect(
    useCallback(() => {
      getSpecList();
    }, []),
  );

  useEffect(() => {
    if (sortOpen) return;
    const isOn = selectedSort !== sortIdx.current;
    if (isOn) {
      // initPage();
      getSpecList();
      sortIdx.current = selectedSort;
    }
  }, [sortOpen]);

  return (
    <View className="flex-1">
      <View className="flex-row justify-between gap-[8] py-[23] px-[20] border-b border-b-[#ECEBEB]">
        {SPEC_MENU.map(v => (
          <Pressable
            className={`w-[52] h-[38] justify-center items-center ${
              v.category === clickedCategory ? 'bg-[#0094FF]' : 'bg-[#EAF4FF]'
            }`}
            style={{ borderRadius: 4 }}
            key={v.category}
            onPress={() => setClickedCategory(v.category)}>
            <Text
              className={`font-[Inter-Medium] text-center ${
                v.category === clickedCategory ? 'text-white' : 'text-[#0094FF]'
              }`}
              size={12}>
              {v.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Image
            source={require('@assets/images/loader-spinner.gif')}
            style={{ width: 100, height: 100 }}
          />
        </View>
      ) : specList.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text size={14}>아직 회고가 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{
            gap: 15,
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
          data={specList}
          renderItem={renderItem}
          keyExtractor={item => `${item.specId}`}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ToggleButton />}
        />
      )}

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
    </View>
  );
}

export default ReviewList;
