import { ShrinkNavigationContext } from "contexts/shrinkNavigation";
import { RippleRefreshContext } from "contexts/RippleRefresh";
import { MusicStoreContext } from "@contexts/MusicStore";
import { SelectMusicContext } from "@contexts/SelectMusic";

export default function Wrapper({ children }) {
    return (
        <ShrinkNavigationContext>
            <RippleRefreshContext>
                <MusicStoreContext>
                    <SelectMusicContext>{children}</SelectMusicContext>
                </MusicStoreContext>
            </RippleRefreshContext>
        </ShrinkNavigationContext>
    );
}
