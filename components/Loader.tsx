import LinearProgress, {
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import styled from "@emotion/styled";
import { useLoading } from "@contexts/Loading";

const BorderLinearProgress = styled(LinearProgress)(() => ({
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    width: `100%`,
})) as typeof LinearProgress;

export default function Loader({ ...rest }: LinearProgressProps) {
    const { value: loading } = useLoading();

    return loading ? (
        <BorderLinearProgress color="secondary" {...rest} />
    ) : (
        <></>
    );
}
