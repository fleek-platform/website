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
import CategoryCards from '../CategoryCards';

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
    <div className="mx-auto my-[35px] w-[90%] max-w-[768px] lg:w-[70%] xl:w-[65%]">
      <div className="rounded-[8px] border border-[#313538] px-[2.5rem] py-[3rem] md:px-[4rem]">
        <h1 className="text-[3.2rem] font-medium text-[#ECEDEE] md:text-[3.5rem] xl:text-[4rem]">
          Submit a request
        </h1>

        {showToolTip && (
          <div className="mt-[4rem] md:mt-[5rem] xl:mt-[6.5rem]">
            <Tooltip />
          </div>
        )}

        <div className="mb-[1.8rem] mt-[3rem]">
          <Dropdown {...defaultOptions} />
        </div>

        <div>
          <div className="mb-[2rem] xl:mb-[3rem]">{renderForm()}</div>
        </div>
      </div>
    </div>
  );
}

function Tooltip() {
  return (
    <div className="flex items-center gap-[6px] rounded-[0.5rem] border border-[#369eff] p-[1rem] lg:gap-[10px] lg:px-[1.3rem] lg:py-[1.4rem] xl:px-[1.5rem] xl:py-[1.55rem]">
      <div>
        <IoIosInformationCircle
          fill="#61a5ff"
          fontSize={24}
          className="lg:text-[2.3rem] xl:text-[2.5rem]"
        />
      </div>

      <p className="text-[1rem] sm:text-[1.35rem] xl:text-[1.47rem]">
        Providing as much information as possible in your request will allow us
        to help you faster
      </p>
    </div>
  );
}

export default DynamicForm;
