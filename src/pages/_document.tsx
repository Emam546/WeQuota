import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>We Quota App</title>
        {/* Use absolute root-relative path for favicon so Next serves it correctly */}
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- Fonts --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta
          content="WE
Telecom Egypt
WE Internet
Internet Packages Egypt
WE Internet Packages
Home Internet Egypt
Mobile Packages Egypt
Broadband Internet Egypt
Fiber Internet Egypt
Pay WE Bill Online"
          lang="en-US"
          name="keywords"
        ></meta>
        <meta
          content="Discover WE Egypt home internet, fiber broadband, mobile packages, telecom services, online recharge, bill payment, and exclusive internet offers in Egypt."
          lang="en-US"
          name="description"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
