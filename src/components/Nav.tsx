import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

export default function Nav(props: PropsWithChildren<{}>) {
  const [, setStuck] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cache = navRef.current;
    if (cache != null) {
      const observer = new IntersectionObserver(([e]) => setStuck(e.intersectionRatio < 1), { threshold: [1] });
      observer.observe(cache);
      return () => observer.unobserve(cache);
    }
  }, [navRef]);

  return (
    <nav className={`sticky -top-1 z-50 bg-[#161117]`} ref={navRef}>
      <div className={`flex gap-3 p-4 transition-all`}>{props.children}</div>
    </nav>
  );
}
