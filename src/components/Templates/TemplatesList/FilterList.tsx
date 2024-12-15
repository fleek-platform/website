import Checkbox from '@components/Checkbox/Checkbox';

interface FilterListProps<T> {
  items: (T & { amount: number })[];
  selectedItem?: string;
  onChange: (itemName: string | undefined) => void;
  renderLabel: (item: T & { amount: number }) => React.ReactNode;
}

export const FilterList = <T extends { name: string }>({
  items,
  selectedItem,
  onChange,
  renderLabel,
}: FilterListProps<T>) =>
  items.map((item) => (
    <Checkbox
      key={item.name}
      id={item.name}
      label={item.name}
      className="mb-10"
      checked={selectedItem === item.name}
      labelElement={renderLabel(item)}
      onChange={() =>
        onChange(selectedItem !== item.name ? item.name : undefined)
      }
    />
  ));
