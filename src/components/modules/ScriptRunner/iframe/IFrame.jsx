/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import useHandleMessage from "./useHandleMessage";

function IFrame({ className }, ref) {
  useHandleMessage();

  return <iframe ref={ref} sandbox="allow-scripts allow-downloads" title="sandbox-iframe" src="sandbox.html" className={className} />;
}

export default forwardRef(IFrame);
