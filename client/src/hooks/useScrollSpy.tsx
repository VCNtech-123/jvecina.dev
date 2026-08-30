import { useEffect, useState } from "react";

type Options = {
  rootMargin?: string;
};

const useScrollSpy = (sectionIds: string[], options: Options = {}) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5],
        rootMargin: options.rootMargin ?? "-35% 0px -55% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, options.rootMargin]);

  return activeId;
};

export default useScrollSpy;