import { Pressable, View } from 'react-native';
import { CustomText as Text } from '@components/CustomText';
import { CATEGORY_LABEL, SpecBase, renderSpecIcon } from '@screens/Spec';

interface SpecListItemBase {
  item: SpecBase;
  callbackFn?: (specItem: SpecBase) => void;
}
export default function SpecListItem({
  item,
  callbackFn,
}: Readonly<SpecListItemBase>) {
  return (
    <Pressable
      key={item.specId}
      className="flex-1 flex-row justify-between items-center gap-[10] border border-[#DEDEDE] p-[16] h-[78] mx-[14] my-[1]"
      style={{ borderRadius: 10 }}
      onPress={() => callbackFn && callbackFn(item)}>
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
}
