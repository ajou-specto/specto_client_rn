import { Pressable, View } from 'react-native';
import { CustomText as Text } from '@components/CustomText';
import ChevronBottom from '@assets/images/chevron-bottom-black.svg';
import ChevronRight from '@assets/images/chevron-right-white.svg';
import { ReviewCalendarScreenProps } from '@screens/ReviewCalendar';

export interface ReviewBase {
  reviewId: number;
  specId: number;
  specName: string;
  category: string;
  date: string;
  dplusDay: number;
}
export const REVIEW_DATA = [
  {
    reviewId: 1,
    specId: 1,
    specName: '정보처리기사',
    category: 'certificate',
    date: '2024-03-06',
    dplusDay: 16,
  },
  {
    reviewId: 2,
    specId: 1,
    specName: '정보처리기사',
    category: 'certificate',
    date: '2024-03-06',
    dplusDay: 16,
  },
  {
    reviewId: 1,
    specId: 2,
    specName: 'SolidIT 현장실습',
    category: 'intern',
    date: '2024-03-06',
    dplusDay: 16,
  },
  {
    reviewId: 1,
    specId: 3,
    specName: '어쩌고 현장실습',
    category: 'intern',
    date: '2024-03-06',
    dplusDay: 16,
  },
  {
    reviewId: 2,
    specId: 3,
    specName: '어쩌고 현장실습',
    category: 'intern',
    date: '2024-03-26',
    dplusDay: 20,
  },
  {
    reviewId: 3,
    specId: 3,
    specName: '어쩌고 현장실습',
    category: 'intern',
    date: '2024-03-29',
    dplusDay: 30,
  },
];

interface ReviewListItemBase {
  item: ReviewBase;
  navigation: ReviewCalendarScreenProps;
  setIsDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedReviewId: React.Dispatch<React.SetStateAction<number>>;
}
export default function ReviewListItem({
  item,
  navigation,
  setIsDetailOpen,
  setSelectedReviewId,
}: Readonly<ReviewListItemBase>) {
  return (
    <View
      className="justify-between border border-[#DEDEDE] py-[8] px-[16] mb-[14]"
      style={{ borderRadius: 10 }}>
      <View className="mb-[7]">
        <View className="flex-row items-center justify-between border-b border-[#EFEFEF] pb-[7]">
          <Text className="text-[#636366]" size={12.3}>
            {item.date}
          </Text>
          <Pressable
            className="justify-center items-center w-[69] h-[22] bg-[#0094FF]"
            style={{ borderRadius: 4 }}
            onPress={() =>
              navigation.navigate('ReviewListUp', {
                specItem: {
                  specId: item.specId,
                  name: item.specName,
                  category: item.category,
                  startDate: item.date,
                  endDate: item.date,
                  completed: false,
                },
              })
            }>
            <View className="flex-row justify-center items-center">
              <Text
                className="text-white font-[Inter-SemiBold] mr-[10]"
                size={11}>
                회고 기록
              </Text>
              <ChevronRight />
            </View>
          </Pressable>
        </View>
        <View className="flex-row justify-between pt-[13]">
          <Text className="font-[Inter-SemiBold]" size={18}>
            {item.specName}
          </Text>
          <Text className="font-[Inter-Medium] text-[#0094FF]" size={18}>
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
        <Text className="font-[Inter-Medium] text-[#373737] mr-[12]" size={12}>
          회고 펼쳐보기
        </Text>
        <ChevronBottom />
      </Pressable>
    </View>
  );
}
