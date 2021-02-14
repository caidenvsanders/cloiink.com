/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React Imports
import { useEffect, useMemo } from 'react';

// Lodash Imports
import { get, uniqBy, setWith, clone } from 'lodash';

// Type Declarations
interface IInfiniteScrollProps {
  data?: any;
  dataKey?: any;
  fetchMore?: any;
  variables?: any;
  count?: any;
  children?: any;
}

/**
 * Component that adds the infinite scroll functionality to the UI
 */
const InfiniteScroll = ({
  data,
  dataKey,
  fetchMore,
  variables,
  count,
  children,
}: IInfiniteScrollProps) => {
  const handleScroll = useMemo(
    () => async () => {
      const loadMore = () => {
        return fetchMore({
          variables: { ...variables, skip: data.length },
          updateQuery: (
            prev: any,
            { fetchMoreResult }: { fetchMoreResult: any },
          ) => {
            const previousData = get(prev, dataKey);
            const fetchMoreData = get(fetchMoreResult, dataKey);
            return setWith(
              clone(prev),
              dataKey,
              uniqBy([...previousData, ...fetchMoreData], 'id'),
              clone,
            );
          },
        });
      };

      const windowHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      const offsetHeight = document.documentElement.offsetHeight;
      const scrolled =
        windowHeight + scrollTop > offsetHeight - offsetHeight / 3;

      // Stop event listener if all the data has been loaded
      if (data.length >= count) {
        window.removeEventListener('scroll', handleScroll);
        return;
      }

      // Load more data if user has scrolled to bottom and if there's still data in the database to display
      if (scrolled) {
        window.removeEventListener('scroll', handleScroll);
        loadMore();
      }
    },
    [count, data.length, dataKey, fetchMore, variables],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return children(data);
};

export default InfiniteScroll;
