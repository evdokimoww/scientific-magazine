import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { DomainContext } from '../context/DomainContext.jsx';

const SiteTitle = ({ pageName }) => {
  const { domain } = useContext(DomainContext);
  const { t } = useTranslation('translation', { keyPrefix: `header.${domain}` });

  return (
    <Helmet>
      <title>{ `${t('title')} | ${pageName}` }</title>
    </Helmet>
  );
};

export default SiteTitle;
