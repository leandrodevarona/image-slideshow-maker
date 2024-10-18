"use client";

import { useState, useEffect } from "react";

export enum Device {
  Desktop = "Desktop",
  Mobile = "Mobile",
  Tablet = "Tablet",
}

const useDeviceDetection = () => {
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isMobile) {
        setDevice(Device.Mobile);
      } else if (isTablet) {
        setDevice(Device.Tablet);
      } else {
        setDevice(Device.Desktop);
      }
    };

    handleDeviceDetection();
    window.addEventListener("resize", handleDeviceDetection);

    return () => {
      window.removeEventListener("resize", handleDeviceDetection);
    };
  }, []);

  return device;
};

export default useDeviceDetection;
