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

    const afterWorkSections = ['experience', 'contact', 'footer'];

    // Total steps: 0 (home), 1 (about), 2..1+cardCount (work cards), then experience, contact, footer
    const getMaxSteps = () => 1 + getWorkCardCount() + afterWorkSections.length;

    // Check if viewport is currently aligned with #work section
    const isWorkActive = () => {
      const workEl = getEl('work');
      return !!workEl && Math.abs((pageScroll?.scrollTop || 0) - workEl.offsetTop) < 120;
    };

    let isAnimating = false;
    let cooldownUntil = 0;
    let accumulatedDelta = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    // Smooth scroll using native browser smooth scrolling
    function smoothScrollTo(element: HTMLElement, targetTop: number, onDone: () => void) {
      const start = element.scrollTop;
      const dist = Math.abs(targetTop - start);
      if (dist < 3) {
        onDone();
        return;
      }

      element.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      // Shorter, responsive animation lock (380ms matches the native glide curve)
      setTimeout(onDone, 380);
    }

    // Determine current logical step based on actual scroll position
    function getCurrentStep(): number {
      const cardCount = getWorkCardCount();
      const workScroll = getWorkScroll();
      const currentScroll = pageScroll?.scrollTop || 0;

      if (isWorkActive() && workScroll && cardCount > 0) {
        const cardHeight = getWorkCardHeight();
        const cardIdx = Math.round(workScroll.scrollTop / cardHeight);
        return 2 + Math.max(0, Math.min(cardCount - 1, cardIdx));
      }

      const allSections = [
        { id: 'home', step: 0 },
        { id: 'about', step: 1 },
        { id: 'experience', step: 2 + cardCount },
        { id: 'contact', step: 3 + cardCount },
        { id: 'footer', step: 4 + cardCount },
      ];

      let closestStep = 0;
      let minDiff = Infinity;
      for (const s of allSections) {
        const el = getEl(s.id);
        if (!el) continue;
        const diff = Math.abs(el.offsetTop - currentScroll);
        if (diff < minDiff) {
          minDiff = diff;
          closestStep = s.step;
        }
      }
      return closestStep;
    }

    // Go to specific step
    function goToStep(step: number, dir = 0) {
      const max = getMaxSteps();
      step = Math.max(0, Math.min(max, step));

      const workEl = getEl('work');
      const workScroll = getWorkScroll();
      const cardCount = getWorkCardCount();
      const isCardStep = step >= 2 && step <= 1 + cardCount;

      isAnimating = true;
      cooldownUntil = performance.now() + 400;

      const onDone = () => {
        isAnimating = false;
      };

      if (isCardStep && workEl && workScroll) {
        const cardTop = (step - 2) * getWorkCardHeight();
        if (isWorkActive()) {
          smoothScrollTo(workScroll, cardTop, onDone);
        } else {
          workScroll.scrollTop = cardTop;
          smoothScrollTo(pageScroll!, workEl.offsetTop, onDone);
        }
      } else if (step === 0) {
        const targetEl = getEl('home');
        if (targetEl) smoothScrollTo(pageScroll!, targetEl.offsetTop, onDone);
        else onDone();
      } else if (step === 1) {
        const targetEl = getEl('about');
        if (targetEl) smoothScrollTo(pageScroll!, targetEl.offsetTop, onDone);
        else onDone();
      } else {
        const afterIndex = step - 2 - cardCount;
        const targetId = afterWorkSections[afterIndex] || 'footer';
        const targetEl = getEl(targetId);

        // Special handling for footer: if entering footer from above, scroll to footer
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
      const max = getMaxSteps();
      const currentStep = getCurrentStep();

      // Check footer boundary overflow if screen is short
      const footerEl = getEl('footer');
      if (footerEl && pageScroll) {
        const maxScroll = pageScroll.scrollHeight - pageScroll.clientHeight;
        const isAtFooter = currentStep >= 4 + cardCount;

        // If at footer and scrolling down, and footer still has unseen bottom content
        if (isAtFooter && dir > 0) {
          if (pageScroll.scrollTop < maxScroll - 8) {
            isAnimating = true;
            cooldownUntil = performance.now() + 380;
            smoothScrollTo(pageScroll, maxScroll, () => {
              isAnimating = false;
            });
            return;
          }
          // Already at absolute bottom: do nothing, don't jitter
          return;
        }

        // If at footer and scrolling up, and we were scrolled past footer.offsetTop
        if (isAtFooter && dir < 0 && pageScroll.scrollTop > footerEl.offsetTop + 16) {
          isAnimating = true;
          cooldownUntil = performance.now() + 380;
          smoothScrollTo(pageScroll, footerEl.offsetTop, () => {
            isAnimating = false;
          });
          return;
        }
      }

      // If at home and scrolling up, do nothing
      if (currentStep === 0 && dir < 0) {
        return;
      }

      const nextStep = Math.max(0, Math.min(max, currentStep + dir));
      if (nextStep !== currentStep) {
        goToStep(nextStep, dir);
      }
    }

    // Wheel event handler with fluid trackpad accumulator
    function onWheel(e: WheelEvent) {
      if (!isDesktop()) return;

      const target = e.target as HTMLElement;
      if (target?.closest('input, textarea, select, [data-no-snap="true"]')) return;

      const rawDelta = e.deltaY;
      if (Math.abs(rawDelta) < 1.5) return;

      e.preventDefault();

      const now = performance.now();

      // If currently animating or in cooldown, discard and reset accumulator
      if (isAnimating || now < cooldownUntil) {
        accumulatedDelta = 0;
        return;
      }

      accumulatedDelta += rawDelta;

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accumulatedDelta = 0;
      }, 150);

      // Laptop trackpad swipe: reaches 30-40 delta within 30-60ms.
      // Standard mouse wheel notch: delta is ~100 on the first event.
      if (Math.abs(accumulatedDelta) >= 30) {
        const dir = accumulatedDelta > 0 ? 1 : -1;
        accumulatedDelta = 0;
        if (resetTimer) clearTimeout(resetTimer);
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
        if (!isAnimating) goToStep(getMaxSteps());
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
        const now = performance.now();
        if (!isAnimating && now >= cooldownUntil) {
          changeStep(dir);
        }
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
      if (resetTimer) clearTimeout(resetTimer);
      pageScroll.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <>{children}</>;
};

