import SearchInput from '@ism/app/components/common/inputs/SearchInput';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function SearchPhotos() {
  return (
    <SearchInput
      name="photos"
      icon={<MagnifyingGlassIcon width={20} height={20}/>}
      placeholder="Keywords..."
    />
  );
}
