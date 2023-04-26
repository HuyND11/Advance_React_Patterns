import React, { forwardRef, useEffect, useRef, useState } from "react";
import mojs from "@mojs/core";

/**
 * Custom Hook for animation
 */

const useClapAnimation = ({ buttonRef, countRef, countTotalRef }) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    () => new mojs.Timeline()
  );

  useEffect(() => {
    const tlDuration = 300;
    const scaleButton = new mojs.Html({
      el: buttonRef.current,
      duration: tlDuration,
      scale: {
        1.3: 1,
      },
      easing: mojs.easing.ease.out,
    });

    const triangleBurst = new mojs.Burst({
      parent: buttonRef.current,
      radius: { 50: 95 },
      count: 7,
      angle: 30,
      children: {
        shape: "polygon",
        radius: { 6: 0 },
        stroke: "rgba(211,54,0,0.5)",
        strokeWidth: 4,
        angle: 210,
        delay: 50,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration,
      },
    });

    const circleBurst = new mojs.Burst({
      parent: buttonRef.current,
      radius: { 50: 75 },
      angle: 25,
      duration: tlDuration,
      children: {
        shape: "circle",
        fill: "rgba(149, 165, 166, 0.5)",
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });

    const countAnimation = new mojs.Html({
      el: countRef.current,
      opacity: { 0: 1 },
      y: { 0: -30 },
      duration: tlDuration,
    }).then({
      opacity: { 1: 0 },
      delay: tlDuration / 2,
      y: -80,
    });

    const countTotalAnimation = new mojs.Html({
      el: countTotalRef.current,
      opacity: { 0: 1 },
      deday: (4 * tlDuration) / 2,
      duration: tlDuration,
      y: { 0: -3 },
    });

    buttonRef.current.style.transform = "scale(1,1)";

    const newAnimationTimeline = animationTimeline.add([
      scaleButton,
      countTotalAnimation,
      countAnimation,
      triangleBurst,
      circleBurst,
    ]);
    setAnimationTimeline(newAnimationTimeline);
  }, [animationTimeline, countRef, countTotalRef, buttonRef]);

  return animationTimeline;
};

function MediumClapCustomHook() {
  const MAX_USER_CLAP = 12;
  const [clapState, setClapState] = useState({
    count: 0,
    totalCount: 0,
    isClick: false,
  });

  const buttonRef = useRef(null);
  const countRef = useRef(null);
  const countTotalRef = useRef(null);

  const animationTimeline = useClapAnimation({
    buttonRef,
    countRef,
    countTotalRef,
  });

  const { count, totalCount, isClick } = clapState;
  const handleClapClick = () => {
    animationTimeline.replay();

    setClapState((pervState) => ({
      ...pervState,
      count: Math.min(pervState.count + 1, MAX_USER_CLAP),
      totalCount:
        count < MAX_USER_CLAP ? pervState.totalCount + 1 : pervState.totalCount,
      isClick: true,
    }));
  };

  return (
    <button ref={buttonRef} className="clap" onClick={handleClapClick}>
      <ClapIcon isclick={isClick} />
      <ClapCount ref={countRef} count={count} />
      <CountTotal ref={countTotalRef} countTotal={totalCount} />
    </button>
  );
}

/**
 * Subcomponents
 */

const ClapIcon = ({ isClick }) => {
  return (
    <span className={`icon ${isClick && "checked"}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70px"
        height="70px"
        viewBox="0 0 700 700"
      >
        <defs>
          <symbol id="a" overflow="visible">
            <path d="M2.219-.125c-.117.055-.235.094-.36.125s-.257.047-.39.047c-.399 0-.715-.11-.953-.328-.23-.227-.344-.535-.344-.922 0-.383.113-.688.344-.906.238-.227.554-.344.953-.344.133 0 .265.015.39.047.125.023.243.062.36.125v.5a1.404 1.404 0 0 0-.344-.157A1.085 1.085 0 0 0 1.531-2c-.23 0-.406.074-.531.219-.125.136-.187.328-.187.578s.062.45.187.594c.125.136.3.203.531.203.114 0 .227-.016.344-.047.113-.04.227-.098.344-.172z" />
          </symbol>
          <symbol id="b" overflow="visible">
            <path d="M1.625-1.313a.568.568 0 0 0-.156-.062c-.055-.008-.102-.016-.14-.016a.44.44 0 0 0-.36.157c-.074.093-.11.23-.11.406V0H.281v-1.813H.86v.297a.727.727 0 0 1 .25-.25.649.649 0 0 1 .344-.093c.02 0 .04.007.063.015h.109z" />
          </symbol>
          <symbol id="c" overflow="visible">
            <path d="M2.094-.906v.156H.734a.414.414 0 0 0 .141.313c.082.062.203.093.36.093.124 0 .25-.015.374-.047.125-.039.254-.097.391-.172v.454c-.137.054-.273.09-.406.109a1.887 1.887 0 0 1-.422.047c-.324 0-.578-.082-.766-.25C.226-.367.141-.602.141-.906c0-.29.086-.52.265-.688.176-.176.422-.265.735-.265.289 0 .52.09.687.265.176.168.266.399.266.688zm-.61-.203a.342.342 0 0 0-.093-.25.325.325 0 0 0-.25-.11.408.408 0 0 0-.282.094.484.484 0 0 0-.125.266z" />
          </symbol>
          <symbol id="d" overflow="visible">
            <path d="M1.094-.813a.535.535 0 0 0-.281.063.2.2 0 0 0-.094.172c0 .074.023.133.078.172.05.043.117.062.203.062a.38.38 0 0 0 .281-.11c.07-.081.11-.179.11-.296v-.063zm.875-.218v1.03H1.39v-.265a.718.718 0 0 1-.61.313.7.7 0 0 1-.468-.156.577.577 0 0 1-.172-.438c0-.207.07-.36.218-.453.145-.102.375-.156.688-.156h.344v-.047c0-.094-.04-.16-.11-.203a.757.757 0 0 0-.343-.063c-.118 0-.23.016-.344.047a1.756 1.756 0 0 0-.297.094v-.438c.125-.03.25-.05.375-.062.125-.02.25-.031.375-.031.332 0 .566.07.703.203.145.125.219.336.219.625z" />
          </symbol>
          <symbol id="e" overflow="visible">
            <path d="M.906-2.328v.516H1.5v.421H.906v.766c0 .086.016.14.047.172.04.023.11.031.203.031h.297V0h-.5C.734 0 .57-.047.47-.14.375-.235.329-.396.329-.626v-.766H.046v-.421h.281v-.516z" />
          </symbol>
          <symbol id="f" overflow="visible">
            <path d="M1.516-1.547v-.969h.578V0h-.578v-.266c-.086.106-.172.184-.266.235S1.039.047.906.047A.671.671 0 0 1 .36-.22C.223-.395.156-.625.156-.906s.067-.508.203-.688a.682.682 0 0 1 .547-.265c.125 0 .235.027.328.078a.978.978 0 0 1 .282.234zM1.125-.375c.125 0 .219-.04.281-.125.07-.094.11-.227.11-.406a.644.644 0 0 0-.11-.39c-.062-.095-.156-.141-.281-.141s-.219.046-.281.14-.094.227-.094.39c0 .18.031.313.094.407.062.086.156.125.281.125z" />
          </symbol>
          <symbol id="g" overflow="visible">
            <path d="M1.25-.375c.113 0 .203-.04.266-.125.07-.094.109-.227.109-.406a.644.644 0 0 0-.11-.39.302.302 0 0 0-.265-.141.353.353 0 0 0-.297.14.705.705 0 0 0-.094.39c0 .18.032.313.094.407.07.086.172.125.297.125zM.86-1.547a.981.981 0 0 1 .265-.234.68.68 0 0 1 .328-.078c.227 0 .41.09.547.265.145.18.219.406.219.688S2.145-.395 2-.22a.651.651 0 0 1-.547.266c-.125 0-.234-.028-.328-.078S.941-.161.859-.266V0H.281v-2.516H.86z" />
          </symbol>
          <symbol id="h" overflow="visible">
            <path d="M.047-1.813h.578l.484 1.235.407-1.235h.578L1.344.173c-.086.195-.18.336-.282.422a.579.579 0 0 1-.39.125H.328v-.39h.188C.609.328.676.312.719.28a.278.278 0 0 0 .11-.156L.843.063z" />
          </symbol>
          <symbol id="i" overflow="visible">
            <path d="M1.953-1.516a.854.854 0 0 1 .266-.25.615.615 0 0 1 .328-.093c.207 0 .363.07.469.203.113.125.171.308.171.547V0H2.61V-1.047c0-.133-.023-.226-.062-.281-.031-.063-.09-.094-.172-.094a.298.298 0 0 0-.266.14.87.87 0 0 0-.093.391V0h-.579v-.937c0-.207-.015-.336-.046-.391-.032-.063-.094-.094-.188-.094a.298.298 0 0 0-.266.14C.883-1.186.86-1.054.86-.89V0H.281v-1.812H.86v.265a.835.835 0 0 1 .235-.234.64.64 0 0 1 .312-.078c.125 0 .235.03.328.093s.164.149.22.25z" />
          </symbol>
          <symbol id="j" overflow="visible">
            <path d="M.281-2.516H.86v1.375l.672-.671h.672l-.89.828.953.984h-.703L.859-.75V0H.281z" />
          </symbol>
          <symbol id="k" overflow="visible">
            <path d="M.281-2.516H.86V0H.281z" />
          </symbol>
          <symbol id="l" overflow="visible">
            <path d="M.266-.703v-1.11h.578V-.64c.008.063.023.106.047.125a.21.21 0 0 0 .078.094c.039.024.086.031.14.031a.315.315 0 0 0 .282-.14.636.636 0 0 0 .109-.39v-.892h.578V0H1.5v-.266a.867.867 0 0 1-.281.235.65.65 0 0 1-.313.078c-.21 0-.37-.063-.484-.188C.316-.273.266-.46.266-.703z" />
          </symbol>
          <symbol id="m" overflow="visible">
            <path d="M.281-1.813H.86V0H.281zm0-.703H.86v.47H.281z" />
          </symbol>
          <symbol id="n" overflow="visible">
            <path d="M2.094-1.11V0h-.578v-.844c0-.156-.008-.258-.016-.312a.268.268 0 0 0-.031-.14.27.27 0 0 0-.094-.095.31.31 0 0 0-.125-.03.353.353 0 0 0-.297.14.705.705 0 0 0-.094.39V0H.281v-1.813H.86v.266a.981.981 0 0 1 .266-.234.725.725 0 0 1 .328-.078c.219 0 .38.07.485.203.101.125.156.308.156.547z" />
          </symbol>
          <symbol id="o" overflow="visible">
            <path d="M1.469-2.516v.375h-.313c-.086 0-.14.016-.172.047s-.046.086-.046.157v.125h.484v.421H.938V0H.344v-1.39H.063v-.422h.28v-.125c0-.196.055-.344.173-.438.113-.094.285-.14.515-.14z" />
          </symbol>
          <symbol id="p" overflow="visible">
            <path d="M1.14-1.438a.353.353 0 0 0-.296.141C.78-1.21.75-1.082.75-.907c0 .18.031.313.094.407.07.094.172.14.297.14s.218-.046.28-.14c.071-.094.11-.227.11-.406 0-.176-.039-.305-.11-.39a.315.315 0 0 0-.28-.141zm0-.421c.313 0 .555.09.735.265.176.168.266.399.266.688 0 .304-.09.539-.266.703-.18.168-.422.25-.734.25S.582-.035.406-.203C.226-.367.141-.602.141-.906c0-.29.086-.52.265-.688.176-.176.422-.265.735-.265z" />
          </symbol>
          <symbol id="q" overflow="visible">
            <path d="M2.094-1.11V0h-.578v-.844c0-.156-.008-.258-.016-.312a.268.268 0 0 0-.031-.14.27.27 0 0 0-.094-.095.31.31 0 0 0-.125-.03.353.353 0 0 0-.297.14.705.705 0 0 0-.094.39V0H.281v-2.516H.86v.97a.981.981 0 0 1 .266-.235.725.725 0 0 1 .328-.078c.219 0 .38.07.485.203.101.125.156.308.156.547z" />
          </symbol>
          <symbol id="r" overflow="visible">
            <path d="M.297-2.422H1l.875 1.656v-1.656h.594V0h-.703L.89-1.656V0H.297z" />
          </symbol>
          <symbol id="s" overflow="visible">
            <path d="M.297-2.422h1.047c.3 0 .535.074.703.219.164.137.25.328.25.578s-.086.445-.25.578c-.168.137-.402.203-.703.203H.922V0H.297zm.625.453v.672h.344c.125 0 .218-.023.28-.078a.32.32 0 0 0 .11-.25.325.325 0 0 0-.11-.25c-.062-.063-.155-.094-.28-.094z" />
          </symbol>
          <symbol id="t" overflow="visible">
            <path d="M.281-1.813H.86V-.03C.86.207.801.39.687.516.57.648.398.719.172.719H-.11v-.39h.093C.098.328.176.3.22.25.258.207.28.113.28-.031zm0-.703H.86v.47H.281z" />
          </symbol>
          <symbol id="u" overflow="visible">
            <path d="M1.734-1.75v.469a.8.8 0 0 0-.234-.11.598.598 0 0 0-.234-.047.526.526 0 0 0-.391.141c-.086.094-.125.227-.125.39 0 .169.04.305.125.407.094.094.223.14.39.14a.724.724 0 0 0 .25-.046.71.71 0 0 0 .22-.125v.484c-.087.031-.172.05-.266.063-.094.02-.188.03-.281.03-.325 0-.579-.081-.766-.25C.234-.366.14-.601.14-.905c0-.301.093-.535.28-.703.188-.164.442-.25.767-.25.093 0 .187.011.28.03.095.013.18.04.266.079z" />
          </symbol>
        </defs>
        <path
          fillRule="evenodd"
          d="M508.95 64.852c8.375 19.824 21.723 167.31 21.723 191.82 0 53.027-30.152 129.31-51.074 178.59l-101.93-27.344 61.492-229.48c5.496-19.062 32.84-13.512 26.727 9.324l-28.754 107.35c-3.32 12.414 15.551 17.45 18.879 5.04l28.766-107.34c3.375-12.669 1.86-23.165-6.43-33.423l-6.535-87.69c-1.84-24.93 32.602-29.95 37.133-6.86zm-158.93 410.98-12.746-47.512-127.54 34.188 12.727 47.496 127.55-34.176 12.719-47.512 127.54 34.188L477.543 510l-127.54-34.176zM191.07 64.852c-8.36 19.824-21.723 167.31-21.723 191.82 0 53.027 30.176 129.31 51.074 178.59l101.95-27.344-61.5-229.48c-5.508-19.062-32.852-13.512-26.742 9.324l28.766 107.35c3.328 12.414-15.57 17.45-18.891 5.04l-28.746-107.34c-3.398-12.669-1.887-23.165 6.402-33.423l6.535-87.69c1.864-24.93-32.602-29.95-37.125-6.86z"
        />
      </svg>
    </span>
  );
};

const ClapCount = forwardRef(function ClapCount({ count }, clapCountRef) {
  return (
    <span ref={clapCountRef} className="count">
      + {count}
    </span>
  );
});

const CountTotal = forwardRef(function CountTotal(
  { countTotal },
  countTotatRef
) {
  return (
    <span ref={countTotatRef} className="total">
      {countTotal}
    </span>
  );
});

/**
 * Usage
 */

export default MediumClapCustomHook;
