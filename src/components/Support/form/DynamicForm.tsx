import { useCallback, useEffect, useState } from 'react';
import { categoryOptions, updateUrl } from '../config';
import { IoIosInformationCircle } from 'react-icons/io';

import XYZForm from './XYZForm';
import CoForm from './CoForm';
import BillingForm from './BillingForm';
import CryptoForm from './CryptoForm';
import PartnershipsForm from './PartnershipsForm';
import PhishingForm from './PhishingForm';
import Dropdown from './ui/Dropdown';
import TemplateForm from './TemplateForm';
import FeedbackForm from './FeedbackForm';
import OtherForm from './OtherForm';

function DynamicForm() {
  const [selectedValue, setSelectedValue] = useState('');
  const [formId, setFormId] = useState('');
  const showToolTip = formId.length > 0 && formId !== '-';

  const updateFormFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const ticketFormId = params.get('ticket_form_id');

    if (ticketFormId) {
      setFormId(ticketFormId);
      const selectedOption = categoryOptions.find(
        (option) => option.id === ticketFormId,
      );
      if (selectedOption) {
        setSelectedValue(selectedOption.value);
      }
    } else {
      setFormId('');
      setSelectedValue('');
    }
  }, []);

  useEffect(() => {
    updateFormFromUrl();

    window.addEventListener('popstate', updateFormFromUrl);

    return () => {
      window.removeEventListener('popstate', updateFormFromUrl);
    };
  }, [updateFormFromUrl]);

  const handleDropdownChange = ({
    value,
    id,
  }: {
    value: string;
    id: string;
  }) => {
    setSelectedValue(value);
    updateUrl(id, 'ticket_form_id');
    setFormId(id);
  };

  const defaultOptions = {
    options: categoryOptions,
    selectedValue,
    onChange: handleDropdownChange,
    dropdownLabel: 'Please choose your issue below',
  };

  const renderForm = () => {
    switch (formId) {
      case 'xyz-form':
        return <XYZForm />;
      case 'co-form':
        return <CoForm />;
      case 'billing-form':
        return <BillingForm />;
      case 'crypto-form':
        return <CryptoForm />;
      case 'partnerships-form':
        return <PartnershipsForm />;
      case 'phishing-form':
        return <PhishingForm />;
      case 'template-form':
        return <TemplateForm />;
      case 'feedback-form':
        return <FeedbackForm />;
      case 'other-form':
        return <OtherForm />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto my-[35px] w-[65%] max-w-[768px]">
      <div className="rounded-[8px] border border-[#313538] px-[4rem] py-[3rem]">
        <h1 className="text-[4rem] font-medium text-[#ECEDEE]">
          Submit a request
        </h1>

        {showToolTip && (
          <div className="mt-[6rem]">
            <Tooltip />
          </div>
        )}

        <div className="my-[1.8rem]">
          <Dropdown {...defaultOptions} />
        </div>

        <div>
          <div className="mb-[3rem]">{renderForm()}</div>
        </div>
      </div>
    </div>
  );
}

function Tooltip() {
  return (
    <div className="flex items-center gap-[10px] rounded-[0.5rem] border border-[#369eff] px-[1.5rem] py-[1.55rem]">
      <div>
        <IoIosInformationCircle fill="#61a5ff" fontSize={24} />
      </div>

      <p className="text-[1.47rem]">
        Providing as much information as possible in your request will allow us
        to help you faster
      </p>
    </div>
  );
}

export default DynamicForm;
