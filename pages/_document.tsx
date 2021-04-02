// collects page's style becoming from server and applies it just before the page be rendered
import React from 'react'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBcVS0gDDjQkks1NYgmKCfKctGtHG6ZWcY',
    authDomain: 'minpoker-fc7fa.firebaseapp.com',
    projectId: 'minpoker-fc7fa',
    storageBucket: 'minpoker-fc7fa.appspot.com',
    messagingSenderId: '672134937405',
    appId: '1:672134937405:web:ec8a089f7d2eb254096354',
    measurementId: 'G-7DTECLBR8J',
  })
  // firebase.analytics()
} else {
  firebase.app()
}
export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap"
            rel="stylesheet"
          />

          <title>minPoker</title>
        </Head>
        <body>
          <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>
          <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-analytics.js"></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
