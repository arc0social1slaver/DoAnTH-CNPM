import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <Navbar />
            <body className="min-h-screen flex flex-col">
                <main className="flex-grow">{children}</main>
                

                
            </body>
            <Footer />
        </html>
    );
}

RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

