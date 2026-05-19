import {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from '@/components/ui/toast';
import React from 'react';

export const useAppToast = () => {
  const toast = useToast();
  
  // ID ကို string သို့မဟုတ် null ဖြစ်နိုင်အောင် သတ်မှတ်လိုက်ပါတယ်
  const [toastId, setToastId] = React.useState<string | null>(null);

  const handleToast = ({
    title,
    description,
    successError
  }: {
    title: string;
    description: string;
    successError: boolean;
  }) => {

    // toastId ရှိမရှိနဲ့ active ဖြစ်မဖြစ်ကို စစ်ဆေးပါတယ်
    if (!toastId || !toast.isActive(toastId)) {
      const newId = Math.random().toString(); // string အဖြစ် တန်းပြောင်းလိုက်ပါတယ်

      setToastId(newId);

      toast.show({
        id: newId,
        placement: 'top',
        duration: 2000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;

          // ပြဿနာဖြစ်စေတဲ့ အပို Curly Braces {} များကို ဖယ်ရှားလိုက်ပါတယ်
          return !successError ? (
            <Toast
              nativeID={uniqueToastId}
              action="error"
              variant="solid"
            >
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </Toast>
          ) : (
            <Toast
              nativeID={uniqueToastId}
              action="success"
              variant="solid"
            >
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </Toast>
          );
        },
      });
    }
  };

  return { handleToast };
};