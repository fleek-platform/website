export interface FaqData {
  label: string;
  content: string;
}

export const faqs: FaqData[] = [
  {
    label: 'Which plan is right for me?',
    content:
      "If you're looking for basic agent hosting with standard security features, our Standard plan is perfect for testing and development. For enterprise-grade protection and maximum security, our TEE Agent Hosting plan offers advanced features like Trusted Execution Environment and end-to-end encryption.",
  },
  {
    label: 'Will I get an invoice?',
    content:
      "Yes, you'll receive a detailed invoice for every billing cycle. All invoices are automatically generated and sent to your registered email address, including itemized charges and payment details.",
  },
  {
    label: 'Which payment methods are accepted?',
    content:
      'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise customers. Contact our sales team for custom payment arrangements.',
  },
  {
    label: 'Can I try Fleek without a card on file?',
    content:
      'Yes! You can sign up and explore our platform without adding payment information. We offer a free tier that lets you test our basic features and understand how our service works.',
  },
  {
    label: 'Can I upgrade or downgrade at any time?',
    content:
      'Absolutely! You can change your plan at any time. Changes take effect immediately, and your billing will be prorated based on your usage. There are no penalties or fees for changing plans.',
  },
  {
    label: 'What happens if I cancel my subscription?',
    content:
      "If you cancel your subscription, you'll continue to have access to your plan until the end of your current billing period. We don't offer refunds for partial months, but you won't be charged again after cancellation.",
  },

  {
    label: 'Do you offer enterprise billing options?',
    content:
      "Yes, we offer flexible billing options for teams deploying 500+ agents. These include annual contracts, volume-based pricing tiers, consolidated invoicing, and customized payment terms. Enterprise customers also receive dedicated account management and priority support. Contact our team to discuss your specific requirements and we'll create a billing structure that works for your organization",
  },
];
