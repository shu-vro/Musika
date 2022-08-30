import Head from "next/head";
import ControlPanel from "@components/Control/ControlPanel";
import Navigation from "@components/Navigation/Navigation";
import TransitionEffect from "@components/TransitionEffect";
import Wrapper from "@components/Wrapper";
import "@styles/globals.scss";
import "swiper/scss";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>MUSIKA - Music For Everyone</title>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <Wrapper>
                <Navigation />
                <TransitionEffect>
                    <Component {...pageProps} />
                </TransitionEffect>
                <ControlPanel />
            </Wrapper>
        </>
    );
}

export default MyApp;
