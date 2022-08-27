import { ShrinkNavigationContext } from "contexts/shrinkNavigation";
import { RippleRefreshContext } from "contexts/RippleRefresh";

export default function Wrapper({ children }) {
    return (
        <ShrinkNavigationContext>
            <RippleRefreshContext>{children}</RippleRefreshContext>
        </ShrinkNavigationContext>
    );
}
