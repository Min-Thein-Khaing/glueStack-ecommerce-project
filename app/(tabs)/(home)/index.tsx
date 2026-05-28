import CategoryHeader from '@/features/category/components/CategoryHeader';
import Banner from '@/features/nav/components/Banner';
import HomeNavBar from '@/features/nav/components/HomeNavBar';
import ProductSection from '@/features/product/components/ProductSection';
import { ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  
  return (
    <SafeAreaView className='flex-1  bg-white '>
      <HomeNavBar />
      <ScrollView>
        <Banner />
        <CategoryHeader />
        <ProductSection />

      </ScrollView>
    </SafeAreaView>
  );
}


