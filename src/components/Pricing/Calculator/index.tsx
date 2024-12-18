import { Button } from '@components/Button';
import ContentBox from '@components/ContentBox';
import Text from '@components/Text';
import './RangeInput.module.css';
import { useState, memo, useCallback } from 'react';

type RangeId = 'requests' | 'duration' | 'vcpu' | 'bandwidth';

type CalculatorTemplate = {
  name: string;
  values: Partial<Record<RangeId, number>>;
};

type RangeDefinition = {
  id: RangeId;
  name: string;
  defaultValue: number;
  formatter: (value: string) => string;
  calculateCost: (value: number) => number;
  min: number;
  max: number;
  increments: number;
};

type RangeState = {
  currentValue?: number;
};

const templates: CalculatorTemplate[] = [
  {
    name: 'Hackathon project',
    values: {
      requests: 2_000,
      duration: 12_000,
      vcpu: 4_000,
      bandwidth: 6_000,
    },
  },
  {
    name: 'Personal site',
    values: {
      requests: 5_000,
      duration: 18_000,
      vcpu: 7_000,
      bandwidth: 9_000,
    },
  },
  {
    name: 'Growing SaaS',
    values: {
      requests: 9_000,
      duration: 22_000,
      vcpu: 11_000,
      bandwidth: 13_000,
    },
  },
  {
    name: '"We got users"',
    values: {
      requests: 10_000,
      duration: 28_000,
      vcpu: 12_000,
      bandwidth: 18_000,
    },
  },
];

const ranges: RangeDefinition[] = [
  {
    id: 'requests',
    name: 'Requests per month',
    formatter: (value: string) => `${value}k`,
    calculateCost: (value) => value * 0,
    min: 0,
    defaultValue: 10,
    max: 20_000,
    increments: 2,
  },
  {
    id: 'duration',
    name: 'Duration (hours/month)',
    formatter: (value) => `${value}hrs`,
    calculateCost: (value) => value * 7.2,
    min: 200,
    defaultValue: 9_000,
    max: 20_000,
    increments: 2,
  },
  {
    id: 'vcpu',
    name: 'vCPU',
    formatter: (value) => `${value}hrs`,
    calculateCost: (value) => value * 0.00003,
    min: 200,
    defaultValue: 9_000,
    max: 20_000,
    increments: 2,
  },
  {
    id: 'bandwidth',
    name: 'Bandwidth (GB)',
    formatter: (value) => `${value}GB`,
    calculateCost: (value) => value * 0.05,
    min: 200,
    defaultValue: 9_000,
    max: 20_000,
    increments: 2,
  },
];

type RangeInputProps = RangeDefinition &
  RangeState & {
    handleOnChange: (id: RangeId, value: number) => void;
  };

const RangeInput = memo(
  ({
    name,
    formatter,
    min,
    max,
    increments,
    defaultValue,
    id,
    currentValue,
    handleOnChange,
  }: RangeInputProps) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor="input"
          className="mb-5 flex w-full flex-row justify-between"
        >
          <Text style="s" as="span" className="text-ui-white">
            {name}
          </Text>
          <Text style="s-mid" as="span" className="font-medium text-ui-white">
            {formatter((currentValue ?? defaultValue).toString())}
          </Text>
        </label>
        <input
          type="range"
          id={`${id}-range`}
          min={min}
          max={max}
          step={increments}
          value={currentValue}
          onChange={(event) => handleOnChange(id, parseInt(event.target.value))}
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.currentValue === nextProps.currentValue,
);

const applyTemplate = (
  template: CalculatorTemplate,
  setRangeState: React.Dispatch<React.SetStateAction<Map<RangeId, RangeState>>>,
) => {
  setRangeState((prevState) => {
    const nextState = new Map(prevState);

    for (const [id, value] of Object.entries(template.values)) {
      if (nextState.has(id as RangeId)) {
        nextState.set(id as RangeId, {
          currentValue: value,
        });
      }
    }

    return nextState;
  });
};

const initializeRangeState = (definitions: RangeDefinition[]) =>
  new Map(
    definitions.map((def) => [def.id, { currentValue: def.defaultValue }]),
  );

const Invoice = ({ total }: { total: number }) => {
  return (
    <ContentBox
      className="h-full"
      contentClassName="h-full bg-neutral-2 justify-items-center"
    >
      <Text style="m-mid" className="font-medium text-neutral-12">
        Example Invoice
      </Text>
      <span className="flex flex-row items-baseline gap-6 text-yellow">
        <Text as="span" style="m" className="font-medium">
          $
        </Text>
        <Text style="2xl">{total.toFixed(2)}</Text>
        <Text as="span" style="m" className="font-medium">
          /mo
        </Text>
      </span>
    </ContentBox>
  );
};

const TemplateButton = memo(
  ({
    template,
    handleApplyTemplate,
  }: {
    template: CalculatorTemplate;
    handleApplyTemplate: (template: CalculatorTemplate) => void;
  }) => {
    const onClick = useCallback(
      () => handleApplyTemplate(template),
      [template],
    );

    return (
      <Button
        onClick={onClick}
        variant="secondary"
        size="sm"
        className="w-full"
      >
        {template.name}
      </Button>
    );
  },
  (prevProps, nextProps) => prevProps.template.name === nextProps.template.name,
);

const Calculator = () => {
  const [rangeState, setRangeState] = useState<Map<RangeId, RangeState>>(() =>
    initializeRangeState(ranges),
  );

  const total = ranges.reduce((acc, range) => {
    const currentValue = rangeState.get(range.id)?.currentValue || 0;
    return acc + range.calculateCost(currentValue);
  }, 0);

  const handleRangeChange = useCallback((id: RangeId, newValue: number) => {
    setRangeState((prevState) => {
      const nextState = new Map(prevState);
      nextState.set(id, { ...prevState.get(id), currentValue: newValue });
      return nextState;
    });
  }, []);

  const handleApplyTemplate = (template: CalculatorTemplate) =>
    applyTemplate(template, setRangeState);

  return (
    <>
      <noscript>
        <style type="text/css">{`#calculator { display: none; }`}</style>
        <div className="noscriptmsg">You don't have javascript enabled :)</div>
      </noscript>
      <div id="calculator" className="container">
        <ContentBox contentClassName="bg-neutral-1">
          <div className="flex flex-col gap-20">
            <div className="flex flex-row gap-10">
              {templates.map((template) => (
                <TemplateButton
                  template={template}
                  handleApplyTemplate={handleApplyTemplate}
                  key={template.name}
                />
              ))}
            </div>
            <div className="flex flex-row gap-25">
              <div className="flex w-[60%] flex-col gap-20">
                {ranges.map((props) => (
                  <RangeInput
                    {...props}
                    currentValue={rangeState.get(props.id)?.currentValue}
                    handleOnChange={handleRangeChange}
                  />
                ))}
              </div>
              <div className="w-[40%]">
                <Invoice total={total} />
              </div>
            </div>
          </div>
        </ContentBox>
      </div>
    </>
  );
};

export default Calculator;
