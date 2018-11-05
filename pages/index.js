import React from 'react';

import Article from '../components/Article';
import pdfHelper from '../lib/pdfHelper';

class IndexPage extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const exportPDF = query.exportPDF === 'true';
    const isServer = !!req;

    if (isServer && exportPDF) {
      const buffer = await pdfHelper.componentToPDFBuffer(<Article/>)

      res.setHeader(
        'Content-disposition',
        'attachment; filename="article.pdf',
        );
      res.type('pdf');
      res.send(buffer);
    }

    return {};
  }

  render() {
    return (<Article/>)
  }
}

export default IndexPage;
