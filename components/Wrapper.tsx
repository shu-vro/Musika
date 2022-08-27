import { ShrinkNavigationContext } from "contexts/shrinkNavigation";
import { RippleRefreshContext } from "contexts/RippleRefresh";
import { MusicStoreContext } from "@contexts/MusicStore";

export default function Wrapper({ children }) {
    return (
        <ShrinkNavigationContext>
            <RippleRefreshContext>
                <MusicStoreContext>{children}</MusicStoreContext>
            </RippleRefreshContext>
        </ShrinkNavigationContext>
    );
}
