import "../src/index.css"

export const metadata = {
  title: "AdaptiveShop - Personalized Shopping Experience",
  description: "E-commerce platform that adapts to your shopping persona",
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className="antialiased">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
