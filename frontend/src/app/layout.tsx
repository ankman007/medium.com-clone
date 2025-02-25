import './globals.css';
import ReduxProvider from './components/ReduxProvider';
import Layout from './components/Layout';

export const metadata = {
  title: 'DevFlow',
  description: 'Web content management system that allows for hassle-free way to publish and manage content.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Layout>
          {children}
        </Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}

