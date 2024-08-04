import BarLoader from './components/common/loaders/BarLoader';

import './loading.css';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="loading">
      <BarLoader />
    </div>
  );
}
