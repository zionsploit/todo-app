import 'react-native-reanimated';
import Layout from '@/components/ui/Layout';
import RootNavigation from '@/components/Navigation/RootNavigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/provider/queryClient';
import Toast from 'react-native-toast-message';
import { Provider } from 'jotai'
import { atomProvider } from '@/provider/jotaiProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {

  return (
    <Provider store={atomProvider}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <RootNavigation />
        </Layout>
        <Toast />
      </QueryClientProvider>
    </Provider>
  );
}