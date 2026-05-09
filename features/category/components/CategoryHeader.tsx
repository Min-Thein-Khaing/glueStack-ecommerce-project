import Title from '@/components/Title'
import { VStack } from '@/components/ui/vstack'
import { categories } from '@/data'
import { FlashList } from '@shopify/flash-list'
import React, { useCallback, useState } from 'react'
import CategoryList, { CategoryProps } from './CategoryList'


const CategoryHeader = () => {
  const [selectedId, setSelectedId] = useState<number | null>(1);

  const handlePress = useCallback((id: number) => {
    setSelectedId(id);
  }, []);
  return (
    <VStack className=' mt-2 '>
      <Title title='Shop by Category' btnTitle='See more' />
      <FlashList
        data={categories as CategoryProps[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryList {...item} isSelected={item.id === selectedId} onPress={()=>handlePress(item.id)} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        extraData={selectedId}
        estimatedItemSize={80}
        contentContainerStyle={{ paddingHorizontal: 5, marginVertical: 5 }}

      />

    </VStack>
  )
}

export default CategoryHeader