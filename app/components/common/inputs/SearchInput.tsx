'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import './styles/searchInput.css';

type Props = {
  className?: string;
  name?: string;
  placeholder?: string;
  icon: React.ReactNode;
};

export default function SearchInput({
  className,
  name,
  placeholder = 'Buscar...',
  icon,
}: Props) {
  const QUERY_NAME = name || 'query';

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(QUERY_NAME, term);
    } else {
      params.delete(QUERY_NAME);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <search className="search_input">
      <input
        className={className}
        type="search"
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get(QUERY_NAME)?.toString()}
      />
      <div className="search_input__button">{icon}</div>
    </search>
  );
}
