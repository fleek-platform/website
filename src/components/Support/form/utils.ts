import toast from 'react-hot-toast';
import type { FormValuesType } from './ReportSiteForm';
import { zenDeskEndpoint } from './NewRequestForm';

export const submitForm = async (
  formValuesObject: FormValuesType,
  resetFn: () => void,
) => {
  const formData = new URLSearchParams();
  Object.entries(formValuesObject).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await fetch(`//${zenDeskEndpoint}/ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (!data) {
      const msg =
        data.error?.issues?.[0]?.message ?? 'Oops! Something went wrong. Please try again. If the problem persists, report to us to helps us improve.';
      toast.error(msg);
    } else {
      toast.success('Request submitted successfully');
      resetFn();
    }
  } catch (error) {
    toast.error('Request not submitted, an error occurred');
  }
};
