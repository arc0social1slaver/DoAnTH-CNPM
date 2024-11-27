import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <main className="flex-grow">{children}</main>
                <Header />
                <Footer />
            </body>
        </html>
    );
}

RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

