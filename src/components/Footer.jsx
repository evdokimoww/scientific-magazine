import { Col, Container, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalStatistic } from '../slices/infoSlice';

const Footer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalStatistic());
  }, []);

  const { allArticles, allNumbers, averageArticles } = useSelector((state) => state.info);

  return (
    <Container fluid className="border-top bg-light py-2">
      <Row>
        <Col sm={12} md={6} className="d-flex flex-column">
          <span className="small mb-1">
            Количество выпусков:
            {' '}
            {allArticles}
          </span>
          <span className="small mb-1">
            Общее количество статей:
            {' '}
            {allNumbers}
          </span>
          <span className="small mb-1">
            Среднее количество статей в выпуске:
            {' '}
            {averageArticles}
          </span>
        </Col>
        <Col sm={12} md={6} className="d-flex flex-column justify-content-end">
          <span className="small mb-1 text-end">Разработано в SUPPORT HUB. Курский государственный университет.</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
