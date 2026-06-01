import CategoryHeader from '@/features/category/components/CategoryHeader';
import Banner from '@/features/nav/components/Banner';
import HomeNavBar from '@/features/nav/components/HomeNavBar';
import useProductHook from '@/features/product/hooks/useProductHook';
import useRefreshByUser from '@/hooks/useRefreshByUser';
import { useCategoryId } from '@/stores/useCategoryId';
import React from 'react';

import { ScrollView, RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
   const {categoryId} = useCategoryId()
  
  const { refetchProducts } = useProductHook(categoryId as number);
  const { refreshing, onRefresh } = useRefreshByUser(refetchProducts);
  return (
    <SafeAreaView className='flex-1  bg-white '>
      <HomeNavBar />
      <ScrollView 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
} className=''>
        <Banner />
        <CategoryHeader />
        

      </ScrollView>
    </SafeAreaView>
  );
}


