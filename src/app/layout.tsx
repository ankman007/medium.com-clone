import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import './globals.css';
import store from './redux/store';

export const metadata = {
  title: 'DevFlow',
  description: 'Web content management system that allows for hassle-free way to publish and manage content.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
