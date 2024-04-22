// App.js
import ReactPDF from '@react-pdf/renderer';


import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import CV from './CV';

const App = () => {
  return (
    <div>
      <PDFViewer width="1000" height="600">
        <CV />
      </PDFViewer>
    </div>
  );
};

export default App;