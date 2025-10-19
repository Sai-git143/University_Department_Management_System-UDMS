import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

const DocumentsTab = ({ documents = [] }) => {
  const serverBaseUrl = 'http://localhost:5000'; // This should ideally come from a config file

  return (
    <Card>
      <Card.Body>
        <Card.Title>My Documents</Card.Title>
        <ListGroup variant="flush">
          {documents && documents.length > 0 ? (
            documents.map(doc => (
              <ListGroup.Item key={doc._id} className="d-flex justify-content-between align-items-center">
                <span>{doc.document_type}</span>
                <Button 
                  variant="outline-primary" 
                  href={`${serverBaseUrl}/${doc.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Document
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No documents have been uploaded.</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default DocumentsTab;
