import { useEffect, useState } from "react";
import Icon from "./Icons.jsx";

// Image with a graceful branded fallback when the URL fails to load.
export default function SafeImage({ src, alt, className = "", imgClassName = "", loading = "lazy" }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const positioned = /(^|\s)(absolute|fixed)(\s|$)/.test(className) ? "" : "relative";
  return (
    <div className={`img-fallback overflow-hidden ${positioned} ${className}`}>
      {!failed && src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-ivory/70">
          <div className="flex flex-col items-center gap-2 text-xs tracking-widest uppercase">
            <Icon name="tree" className="h-8 w-8" />
            <span>{alt || "Aryan's Farmstays"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
