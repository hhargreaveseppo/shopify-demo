import { useEffect, useState } from "react";
import { init } from "@eppo/js-client-sdk";

export default function EppoRandomizationProvider({
  waitForInitialization = true,
  children,
  loadingComponent = <div>Loading...</div>,
}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const eppoSdkKey = import.meta.env.VITE_EPPO_SDK_KEY;

  useEffect(() => {
    init({
      apiKey: eppoSdkKey,
      assignmentLogger: {
        logAssignment(assignment) {
          // logging implementation
        },
      },
    }).then(() => {
      return setIsInitialized(true);
    });
  }, []);

  if (!waitForInitialization || isInitialized) {
    return children;
  }
  return loadingComponent;
}
