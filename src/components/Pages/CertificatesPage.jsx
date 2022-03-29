import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import routes from '../../routes';
import { fetchCertificates, selectors as certificatesSelector } from '../../slices/certificatesSlice';

const CertificatesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCertificates());
  });

  const certificates = useSelector(certificatesSelector.selectAll);
  console.log(certificates);
  return (
    <>
      {
        certificates?.map((cert) => (
          <div key={cert.id}>
            <img src={routes.certificateImagePath(cert.img)} alt="" />
            <p>{cert.name_rus}</p>
          </div>
        ))
      }
    </>
  );
};

export default CertificatesPage;
