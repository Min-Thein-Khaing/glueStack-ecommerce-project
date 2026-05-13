import {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from '@/components/ui/toast';

import React from 'react';

export const useAppToast = () => {
  const toast = useToast();

  const [toastId, setToastId] = React.useState(0);

 const handleToast = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {

    if (!toast.isActive(toastId.toString())) {

      const newId = Math.random();

      setToastId(newId);

      toast.show({
        id: newId.toString(),
        placement: 'top',
        duration: 2000,

        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;

          return (
            <Toast
              nativeID={uniqueToastId}
              action="error"
              variant="solid"
            >
              <ToastTitle>{title}</ToastTitle>

              <ToastDescription>
                {description}
              </ToastDescription>
            </Toast>
          );
        },
      });
    }
  };

  return { handleToast };
};