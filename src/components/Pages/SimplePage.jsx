import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPageByLink, selectors as pagesSelectors } from '../../slices/pagesSlice.js';

const SimplePage = () => {
  const dispatch = useDispatch();
  const { pageLink } = useParams();

  useEffect(() => {
    dispatch(fetchPageByLink(pageLink));
  });

  const page = useSelector((state) => pagesSelectors.selectById(state, pageLink));
  return (
    <>
      {
        page !== undefined
          ? (
            <>
              <h2>{page?.name}</h2>
              <div dangerouslySetInnerHTML={{ __html: `${page?.content_rus}` }} />
            </>
          )
          : <p>Данные отсутствуют или не загружены</p>
      }
    </>
  );
};
export default SimplePage;
