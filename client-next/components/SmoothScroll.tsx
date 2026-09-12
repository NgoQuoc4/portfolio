'use client';

import React, { useEffect } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    const pageScroll = document.getElementById('page-scroll');
    if (!pageScroll) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = () => window.innerWidth >= 768;
    const getEl = (id: string) => document.getElementById(id);
    const getWorkScroll = () => getEl('work')?.querySelector<HTMLElement>('.overflow-y-auto');
    const getWorkCardCount = () => getWorkScroll()?.children.length || 0;
    const getWorkCardHeight = () => getWorkScroll()?.clientHeight || 1;

    const remainingSections = ['about', 'contact', 'footer'];

    // Total steps: 0 (home), 1..cardCount (work cards), then about, then contact, then footer
    const maxSteps = () => 1 + getWorkCardCount() + remainingSections.length - 1;

    // Check if viewport is aligned with #work
    const isWorkActive = () => {
      const workEl = getEl('work');
      return !!workEl && Math.abs(pageScroll.scrollTop - workEl.offsetTop) < 150;
    };

    let isAnimating = false;
    let lastWheelTime = -Infinity;
    let lastDir = 0;
    let lastDelta = 0;

    // Smooth scroll function using native browser smooth scrolling for natural, 60fps/120fps glide
    function smoothScrollTo(element: HTMLElement, targetTop: number, onDone: () => void) {
      const start = element.scrollTop;
      const dist = targetTop - start;
      if (Math.abs(dist) < 2) {
        onDone();
        return;
      }

      element.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      // Duration of native smooth scroll across sections is ~750ms
      setTimeout(onDone, 750);
    }

    // Go to specific step
    function goToStep(step: number) {
      step = Math.max(0, Math.min(maxSteps(), step));
      const workEl = getEl('work');
      const workScroll = getWorkScroll();
      const cardCount = getWorkCardCount();
      const isCardStep = step >= 1 && step <= cardCount;

      isAnimating = true;
      const onDone = () => {
        isAnimating = false;
      };

      if (isCardStep && workEl && workScroll) {
        const cardTop = (step - 1) * getWorkCardHeight();
        if (isWorkActive()) {
          smoothScrollTo(workScroll, cardTop, onDone);
        } else {
          workScroll.scrollTop = cardTop;
          smoothScrollTo(pageScroll!, workEl.offsetTop, onDone);
        }
      } else {
        const targetId = step === 0 ? 'home' : remainingSections[step - 1 - cardCount];
        const targetEl = getEl(targetId || 'home');
        if (targetEl) {
          smoothScrollTo(pageScroll!, targetEl.offsetTop, onDone);
        } else {
          onDone();
        }
      }
    }

    // Advance or retreat step
    function changeStep(dir: number) {
      const cardCount = getWorkCardCount();
      const currentStep = (() => {
        const workScroll = getWorkScroll();
        if (isWorkActive() && workScroll) {
          const cardHeight = getWorkCardHeight();
          const cardIdx = Math.round(workScroll.scrollTop / cardHeight);
          return 1 + Math.max(0, Math.min(cardCount - 1, cardIdx));
        }

        const allSections = [
          { id: 'home', step: 0 },
          { id: 'about', step: 1 + cardCount },
          { id: 'contact', step: 1 + cardCount + 1 },
          { id: 'footer', step: 1 + cardCount + 2 },
        ];

        let closestStep = 0;
        let minDiff = Infinity;
        for (const s of allSections) {
          const el = getEl(s.id);
          if (!el) continue;
          const diff = Math.abs(el.offsetTop - (pageScroll?.scrollTop || 0));
          if (diff < minDiff) {
            minDiff = diff;
            closestStep = s.step;
          }
        }
        return closestStep;
      })();

      const nextStep = Math.max(0, Math.min(maxSteps(), currentStep + dir));
      if (nextStep !== currentStep) {
        goToStep(nextStep);
      }
    }

    // Wheel event handler
    function onWheel(e: WheelEvent) {
      if (!isDesktop()) return;

      const target = e.target as HTMLElement;
      if (target?.closest('input, textarea, select, [data-no-snap="true"]')) return;

      e.preventDefault();
      const delta = Math.abs(e.deltaY);
      if (delta < 2) return;

      const now = performance.now();
      const dir = e.deltaY > 0 ? 1 : -1;
      const isNewGesture = now - lastWheelTime > 160;
      const isDirChange = lastDir !== 0 && dir !== lastDir && delta > 10;
      const isAcceleration = delta > 1.8 * lastDelta && delta > 12;

      lastWheelTime = now;
      lastDir = dir;
      lastDelta = delta;

      if (!isAnimating && (isNewGesture || isDirChange || isAcceleration)) {
        changeStep(dir);
      }
    }

    // Keydown handler
    function onKeyDown(e: KeyboardEvent) {
      if (!isDesktop()) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Home') {
        e.preventDefault();
        if (!isAnimating) goToStep(0);
        return;
      }
      if (e.key === 'End') {
        e.preventDefault();
        if (!isAnimating) goToStep(maxSteps());
        return;
      }

      let dir = 0;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        dir = 1;
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        dir = -1;
      }

      if (dir !== 0) {
        e.preventDefault();
        if (!isAnimating) changeStep(dir);
      }
    }

    if (isDesktop()) {
      pageScroll.addEventListener('wheel', onWheel, { passive: false });
    }
    window.addEventListener('keydown', onKeyDown);

    const onResize = () => {
      if (!isDesktop()) {
        pageScroll.removeEventListener('wheel', onWheel);
      } else {
        pageScroll.removeEventListener('wheel', onWheel);
        pageScroll.addEventListener('wheel', onWheel, { passive: false });
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      pageScroll.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <>{children}</>;
};
