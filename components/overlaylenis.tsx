// components/OverlayLenis.tsx
import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function OverlayLenis(props: {
  children: ReactNode
}) {
  return (
    <ReactLenis
      options={{
        wrapper: undefined,
        content: undefined,
        smoothWheel: true,
      }}
      className="h-full overflow-hidden"
    >
      <div className="h-full overflow-auto">
        {props.children}
      </div>
    </ReactLenis>
  );
}