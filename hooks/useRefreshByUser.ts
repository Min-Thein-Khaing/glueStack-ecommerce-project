import { View, Text } from 'react-native'
import React from 'react'

const useRefreshByUser = (refetch: () => Promise<unknown>) => {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await refetch()
        } finally {
            setRefreshing(false);
        }

    };
    return {
        refreshing,
        onRefresh
    }
}

export default useRefreshByUser