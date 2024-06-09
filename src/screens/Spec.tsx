import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { CustomText as Text } from '@components/CustomText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SpecScreenStackParamList } from '@stackNav/SpecScreen';
import Button from '@components/Button';
import Contest from '@assets/images/contest.svg';
import Certificate from '@assets/images/certificate.svg';
import Intern from '@assets/images/intern.svg';
import Project from '@assets/images/project.svg';
import AddIcon from '@assets/images/add-blue.svg';
import SpecCategorySelect from '@screens/SpecCategorySelect';
import axiosInstance from 'src/api/axiosInstance';
import { useFocusEffect } from '@react-navigation/native';

type SpecScreenProps = NativeStackScreenProps<SpecScreenStackParamList, 'Spec'>;

export const CATEGORY_LABEL: { [key: string]: string } = {
  ALL: '전체',
  CONTEST: '공모전',
  CERTIFICATION: '자격증',
  INTERNSHIP: '인턴',
  ACTIVITY: '대외활동',
  PROJECT: '논문/프로젝트',
};

export const SPEC_MENU = Object.entries(CATEGORY_LABEL).map(([k, v]) => {
  return { category: k, label: v };
});

export interface SpecBase {
  specId: number;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

export const SPEC_DATA = [
  // 초기 데이터
];

export const renderSpecIcon = (category: string) => {
  switch (category) {
    case 'CONTEST':
      return <Contest />;
    case 'CERTIFICATION':
      return <Certificate />;
    case 'INTERNSHIP':
      return <Intern />;
    case 'ACTIVITY':
      return <Project />; // TODO: 아이콘 교체
    case 'PROJECT':
      return <Project />;
  }
};

function Spec({ navigation }: Readonly<SpecScreenProps>) {
  const [loading, setLoading] = useState(true);
  const [clickedCategory, setClickedCategory] = useState(SPEC_MENU[0].category);
  const [specList, setSpecList] = useState(SPEC_DATA);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);

  const fetchSpecList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/api/v1/spec?category=${
          clickedCategory === 'ALL' ? '' : clickedCategory
        }`,
      );
      console.log(`spec ${clickedCategory}`, res);
      setSpecList(res.data.content);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [clickedCategory]);

  useFocusEffect(
    useCallback(() => {
      fetchSpecList();
    }, [fetchSpecList]),
  );

  const handleAddSpecPress = () => {
    setIsCategorySelectOpen(true);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => console.log('우측 버튼을 눌렀습니다.')}>
          <Text className="text-[#0094FF]">클릭</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleSpecClick = (id: number, category: string) => {
    console.log(`스펙 ID ${id}를 클릭 - 개별 페이지로 이동.`);
    navigation.navigate('SpecDetail', { id, category });
  };

  const renderItem = ({ item }: { item: Readonly<SpecBase> }) => {
    return (
      <Pressable
        key={item.specId}
        className="flex-1 flex-row justify-between items-center gap-[10] border border-[#DEDEDE] p-[16] h-[78] mx-[14] my-[1]"
        style={{ borderRadius: 10 }}
        onPress={() => {
          console.log(`${item.specId}번 스펙을 클릭했습니다.`);
          handleSpecClick(item.specId, item.category);
        }}>
        <View>
          <View className="flex-row gap-[10] items-center">
            {renderSpecIcon(item.category)}
            <View className="flex-col justify-between">
              <View className="flex-row gap-[7.8] justify-start items-center">
                <Text className="font-[Inter-SemiBold] h-full" size={18}>
                  {item.name}
                </Text>
                <Text className="text-[#AEAEB2]" size={10}>
                  {CATEGORY_LABEL[item.category]}
                </Text>
              </View>
              <Text className="text-[#636366]" size={12}>
                {item.startDate} ~ {item.endDate}
              </Text>
            </View>
          </View>
        </View>
        <View
          className={`justify-center items-center w-[55] h-[22] ${
            item.completed ? 'bg-[#EAF4FF]' : 'bg-[#EFEFEF]'
          }`}
          style={{ borderRadius: 4 }}>
          <Text
            className={`font-[Inter-SemiBold] ${
              item.completed ? 'text-[#0069CF]' : 'text-[#9F9F9F]'
            }`}
            size={12}>
            {item.completed ? '완료' : '진행중'}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 relative">
      <View className="flex-row justify-between gap-[8] py-[23] px-[20] border-b border-b-[#ECEBEB]">
        {SPEC_MENU.map(v => (
          <Pressable
            className={`w-[52] h-[38] justify-center items-center ${
              v.category === clickedCategory ? 'bg-[#0094FF]' : 'bg-[#EAF4FF]'
            }`}
            style={{ borderRadius: 4 }}
            key={v.category}
            onPress={() => {
              setClickedCategory(v.category);
            }}>
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

      <View style={{ flex: 1 }}>
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Image
              source={require('@assets/images/loader-spinner.gif')}
              style={{ width: 100, height: 100 }}
            />
          </View>
        ) : specList.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text size={14}>아직 스펙이 없습니다.</Text>
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
            ListHeaderComponent={
              <Button label="스펙 추가하기" callbackFn={handleAddSpecPress} />
            }
          />
        )}

        <Pressable
          style={{
            position: 'absolute',
            right: 22,
            bottom: 22,
          }}
          onPress={handleAddSpecPress}>
          <AddIcon />
        </Pressable>

        {isCategorySelectOpen && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SpecCategorySelect
              onClose={() => setIsCategorySelectOpen(false)}
              onSelectCategory={category => {
                setIsCategorySelectOpen(false);
                // 선택된 카테고리 처리 로직 추가
                // navigation.navigate("SpecAdd", { category });
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default Spec;
