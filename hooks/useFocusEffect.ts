    import { useFocusEffect } from 'expo-router';
import React, { useCallback, useRef } from 'react'

  export  const useEffectFocus = (refetch: () => void) => {
        const enableRefetch = useRef(false);
        useFocusEffect(useCallback(() => {
            if (enableRefetch.current) {
                refetch();
            }else{
                enableRefetch.current = true;
            }
        },[refetch]));
        return enableRefetch;
    }