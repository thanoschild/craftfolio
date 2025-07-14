import { toast } from 'sonner';

export const showToast = {
  success: (message: string, description?: string) => {
    toast.success(message, { 
      description,
    });
  },
  error: (message: string, description?: string) => {
    toast.error(message, { 
      description,
    });
  },
  info: (message: string, description?: string) => {
    toast.info(message, { 
      description,
    });
  },
  warning: (message: string, description?: string) => {
    toast.warning(message, { 
      description,
    });
  },
  loading: (message: string) => {
    return toast.loading(message, {
    });
  },
  dismiss: (toastId?: string | number) => {
    toast.dismiss(toastId);
  },
};