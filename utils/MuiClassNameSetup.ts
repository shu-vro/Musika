import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/className";

ClassNameGenerator.configure(componentName => {
    if (componentName === "MuiIconButton") {
        return componentName.replace("MuiIconButton", "ripple MuiIconButton");
    }
    return componentName;
});
