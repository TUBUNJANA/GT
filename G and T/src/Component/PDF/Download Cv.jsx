import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CV from './CV'; // Assuming CV component is in a separate file

const DownloadPDF = () => {
  return (
    <div>
      <PDFDownloadLink document={<CV />} fileName="John_Doe_CV.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadPDF;