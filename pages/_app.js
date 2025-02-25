import Navbar from '../components/Navbar';
import '../app/globals.css'; // Import your global styles if any

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;