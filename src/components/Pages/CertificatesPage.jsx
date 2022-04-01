import React, { useContext, useEffect, useState } from 'react';
import 'react-image-lightbox/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import routes from '../../routes';
import { fetchCertificates, selectors as certificatesSelector } from '../../slices/certificatesSlice';
import { LanguageContext } from '../../context/LanguageContext.jsx';

const CertificatesPage = () => {
  const dispatch = useDispatch();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    dispatch(fetchCertificates());
  });

  const certificates = useSelector(certificatesSelector.selectAll);

  return (
    <Row xs={1} sm={2} md={3} className="certificate-page">
      {
        certificates
        && certificates.map((cert) => (
          <Col key={cert.id} className="certificate-page_item">
            <Card>
              <Card.Img
                onClick={() => {
                  setImageSrc(routes.certificateImagePath(cert.img));
                  setLightboxOpen(true);
                }}
                variant="top"
                src={routes.certificateImagePath(cert.img)}
                style={{ cursor: 'pointer' }}
              />
              <Card.Body>
                <Card.Text>
                  { cert[`name_${lang}`] }
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      }
      {lightboxOpen && (
        <Lightbox
          mainSrc={imageSrc}
          onAfterOpen={() => {
            document.querySelector('.ReactModal__Overlay').style.zIndex = '1050';
          }}
          onCloseRequest={() => {
            setImageSrc('');
            setLightboxOpen(false);
          }}
        />
      )}
    </Row>
  );
};

export default CertificatesPage;
