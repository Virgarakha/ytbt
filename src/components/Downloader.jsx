import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import './App.css';

const Downloader = () => {
  const [url, setUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDownloadLink('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/download', { url });
      setDownloadLink(response.data.downloadLink);
    } catch (err) {
      setError('Failed to fetch the download link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Container style={{ maxWidth: '600px' }}>
        <Row className='tengah'>
          <Col>
            <h1 className="">YouTube Video Downloader</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="">
                <Form.Label>Enter YouTube Video URL - By pt.rr and bakol tugas</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Form.Group>
              <Button className='mt-3' variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    /> Loading...
                  </>
                ) : (
                  'Download'
                )}
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {downloadLink && (
              <Alert variant="success" className="mt-3">
                <a href={downloadLink} download>Click here to download your video</a>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Downloader;
