import { useState, useEffect } from "react";

type deviceType = "mobile" | "desktop";
export default function useDeviceType(): deviceType {
    const [device, setDevice] = useState<deviceType>("mobile");
    function _deviceType(): deviceType {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "mobile";
        } else if (
            /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                ua
            )
        ) {
            return "mobile";
        }
        return "desktop";
    }

    useEffect(() => {
        setDevice(_deviceType());
    }, []);

    return device;
}
