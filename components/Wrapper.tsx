import { ShrinkNavigationContext } from "contexts/shrinkNavigation";
import { RippleRefreshContext } from "contexts/RippleRefresh";
import { MusicStoreContext } from "@contexts/MusicStore";
import { SelectMusicContext } from "@contexts/SelectMusic";
import { LoadingContext } from "@contexts/Loading";
import ThemeContext from "@contexts/ThemeProvider";
import { SnackbarProvider } from "notistack";

export default function Wrapper({ children }) {
    return (
        <ThemeContext>
            <LoadingContext>
                <ShrinkNavigationContext>
                    <RippleRefreshContext>
                        <MusicStoreContext>
                            <SelectMusicContext>
                                <SnackbarProvider>{children}</SnackbarProvider>
                            </SelectMusicContext>
                        </MusicStoreContext>
                    </RippleRefreshContext>
                </ShrinkNavigationContext>
            </LoadingContext>
        </ThemeContext>
    );
}
