// PdfViewer.jsx
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import VoluntierNavbar from './navbarvoluntier';
import pdf from "../pdf/12.pdf"
const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
     <VoluntierNavbar />
    {/* <div>
   
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div> */}
    
    </>
  );
};

export default PdfViewer;
