import toast from 'react-hot-toast';
import type { FormValuesType } from './ReportSiteForm';
import { zenDeskEndpoint } from './NewRequestForm';

const parseResponse = async (response: Response) => {
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'Failed to parse response' };
  }
};

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

    const data = await parseResponse(response);

    if (!response.ok) {
      throw new Error(
        data?.error?.issues?.[0]?.message || 'Network response was not ok',
      );
    }

    if (!data) {
      const msg =
        data.error?.issues?.[0]?.message ??
        'Oops! Something went wrong. Please try again. If the problem persists, report to us to helps us improve.';
      toast.error(msg);
    } else {
      toast.success(
        "Your request has been successfully submitted. We'll get back to you shortly.",
      );
      resetFn();
    }
  } catch (error) {
    let errorMsg: string;
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = String(error);
    }
    console.error(errorMsg);
    toast.error("We're sorry, but something went wrong. Please try again.");
  }
};

export async function checkHealthStatus() {
  try {
    const response = await fetch(`//${zenDeskEndpoint}/health`);
    const data = await response.json();
    return data.message === 'OK';
  } catch (error) {
    console.error('Health check failed', error);
    return false;
  }
}
