import ControlPanel from "@components/Control/ControlPanel";
import Navigation from "@components/Navigation/Navigation";
import Wrapper from "@components/Wrapper";
import "@styles/globals.scss";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Wrapper>
                <Navigation />
                <Component {...pageProps} />
                <ControlPanel />
            </Wrapper>
        </>
    );
}

export default MyApp;
