import { createApi } from 'unsplash-js';

const Unsplash = createApi({
  accessKey: String(process.env.UNPLASH_ACCESS_KEY),
});

export default Unsplash;
