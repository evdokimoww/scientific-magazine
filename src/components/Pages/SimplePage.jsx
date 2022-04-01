import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPageByLink, selectors as pagesSelectors } from '../../slices/pagesSlice.js';
import { LanguageContext } from '../../context/LanguageContext.jsx';

const SimplePage = () => {
  const dispatch = useDispatch();
  const { pageLink } = useParams();
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    dispatch(fetchPageByLink(pageLink));
  });

  const page = useSelector((state) => pagesSelectors.selectById(state, pageLink));

  return (
    <div className="text-page">
      {
        page !== undefined
          ? (
            <>
              <h2 className="text-page_title">{page?.name}</h2>
              <hr className="my-4" />
              <div className="text-page_content" dangerouslySetInnerHTML={{ __html: `${ page?.[`content_${lang}`] }` }} />
            </>
          )
          : <p>Данные отсутствуют или не загружены</p>
      }
    </div>
  );
};
export default SimplePage;
