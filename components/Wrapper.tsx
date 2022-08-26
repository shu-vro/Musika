import { ShrinkNavigationContext } from "contexts/shrinkNavigation";

export default function Wrapper({ children }) {
    return <ShrinkNavigationContext>{children}</ShrinkNavigationContext>;
}
