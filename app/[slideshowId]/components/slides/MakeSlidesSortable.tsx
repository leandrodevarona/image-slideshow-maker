'use client';

import MakeSortable from '@ism/app/components/common/sortable/MakeSortable';

type Props = {
  slideshowId: string;
};

export default function MakeSlidesSortable({ slideshowId }: Props) {
  return <MakeSortable elemId={slideshowId} />;
}
