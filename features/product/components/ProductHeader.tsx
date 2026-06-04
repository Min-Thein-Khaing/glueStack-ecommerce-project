import { VStack } from '@/components/ui/vstack'
import Banner from '@/features/nav/components/Banner'
import React from 'react'

/** Banner + title only — CategoryHeader lives in ProductSection so it never remounts on load. */
const ProductHeader = () => {
    return (
        <VStack className="">
            <Banner />
            
        </VStack>
    )
}

export default ProductHeader