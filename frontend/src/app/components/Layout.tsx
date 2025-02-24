import React from 'react';
import Navbar from './Navbar';
import { LayoutProps } from '../../../constant/types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
