import { ShrinkNavigationContext } from "contexts/shrinkNavigation";
import { RippleRefreshContext } from "contexts/RippleRefresh";
import { MusicStoreContext } from "@contexts/MusicStore";
import { SelectMusicContext } from "@contexts/SelectMusic";
import { LoadingContext } from "@contexts/Loading";

export default function Wrapper({ children }) {
    return (
        <LoadingContext>
            <ShrinkNavigationContext>
                <RippleRefreshContext>
                    <MusicStoreContext>
                        <SelectMusicContext>{children}</SelectMusicContext>
                    </MusicStoreContext>
                </RippleRefreshContext>
            </ShrinkNavigationContext>
        </LoadingContext>
    );
}
