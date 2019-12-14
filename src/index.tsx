import React, { useState, useEffect, useRef, createRef } from 'react';
import useInterval from 'use-interval';
import './style.css';

type Props = {
  children: React.ReactNode
  dots?: boolean
  dotWidth?: number
  dotMargin?: number
  dotBorderWidth?: number
  arrow?: boolean
  arrowWidth?: number
  arrowBorderWidth?: number
  transition?: number
  autoPlay?: boolean
  autoPlayMsec?: number
}

const App: React.FC<Props> = (props) => {
  if (!props?.children) return null;
  const childrenLength: number = React.Children.count(props.children);
  const childrenLengthIncludeDummy: number = React.Children.count(props.children) + 2; // 2 is dummy length
  const [transition, setTransition] = useState<number>(props?.transition ?? 300);

  /* common function */
  const sleep = (msec: number) => new Promise(r => setTimeout(r, msec));

  /* base state and ref */
  const carousel = createRef<HTMLDivElement>();
  const [carouselInlineWidth, setCarouselInlineWidth] = useState<number>(0);
  const [carouselInlineHeight, setCarouselInlineHeight] = useState<number>(0);

  /*
    specify index to this variable('showItemIndex') when want to show item.
    be careful, 0 and last is dummy.
  */
  const [showItemIndex, setShowItemIndex] = useState<number>(1);
  const instanceShowItemIndex = useRef<number>(showItemIndex);
  const [inlinePos, setInlinePos] = useState<number>(0); // this variable is decide carousel position for when show item.

  /* want to execute function with temporary ignore animation */
  function noneTransitionCall(callback: Function) {
    return new Promise(async resolve => {
      const beforeTransition: number = transition;
      setTransition(0);
      callback();
      await sleep(50); // break time until finished dom rewrite
      setTransition(beforeTransition);
      resolve();
    })
  }

  /*
    after specify index of item to 'showItemIndex',
    set carousel position with auto.
  */
  useEffect(() => {
    setInlinePos(carouselInlineWidth * showItemIndex);
    instanceShowItemIndex.current = showItemIndex; // always synchronize instance
  }, [showItemIndex]);

  /* initialize width and height and first position for inline in carousel */
  useEffect(() => {
    if (carouselInlineWidth > 0) return;
    noneTransitionCall(() => {
      if (!carousel.current) return;
      setCarouselInlineWidth(carousel.current.clientWidth);
      setCarouselInlineHeight(carousel.current.clientHeight);
      setInlinePos(carousel.current.clientWidth * showItemIndex);
    });
  }, [carousel]);

  /* Basically use this function to move the carousel */
  const isMoving = useRef<boolean>(false);
  function handle(w: 'next' | 'before') {
    return new Promise(async resolve => {
      if (isMoving.current === true) return resolve();
      isMoving.current = true;

      const index: number = instanceShowItemIndex.current;
      const dummyFirst: number = 0;
      const dummyLast: number = childrenLengthIncludeDummy - 1;
      const isDummyFirst: boolean = (index - 1 === dummyFirst && w === 'before');
      const isDummyLast: boolean = (index + 1 === dummyLast && w === 'next');
      setShowItemIndex(w === 'next' ? index + 1 : index - 1);
      await sleep(transition); // wait finished animation

      if (isDummyFirst || isDummyLast) {
        await noneTransitionCall(() => {
          w === 'next'
            ? isDummyLast && setShowItemIndex(1)
            : isDummyFirst && setShowItemIndex(dummyLast - 1)
        });
      }

      isMoving.current = false;
      resolve();
    });
  }

  /*
    if 'props.autoPlay' is true,
    move carousel to only next with auto.
  */
  const playing = useRef<boolean>(true);
  useInterval(() => {
    if (!props?.autoPlay || playing.current === false) return;
    const index: number = instanceShowItemIndex.current;

    (async () => {
      playing.current = false;
      await sleep(props?.autoPlayMsec || 3000);
      if (index === instanceShowItemIndex.current) {
        /* skip if click arrow or swipe or click dots, when during sleep */
        await handle('next');
      }
      playing.current = true;
    })();
  }, 300);

  /*
    if swipe,
    move carousel right and left
  */
  const coordX = useRef<number>(0);
  function ontouchstart(e: any): void {
    const touches = e.changedTouches[0];
    coordX.current = touches.pageX;
  }
  function ontouchmove(e: any): void {
    e.preventDefault();
    const touches = e.changedTouches[0];
    const diff: number = touches.pageX - coordX.current;
    const weighting: number = 30;
    setInlinePos(inlinePos - (diff / weighting));
  }
  function ontouchend(e: any): void {
    const touches = e.changedTouches[0];
    const diff: number = touches.pageX - coordX.current;
    Math.abs(diff) > 150
      ? handle(Math.sign(diff) > -1 ? 'before' : 'next')
      : setInlinePos(showItemIndex * carouselInlineWidth)
  }

  /* style for arrow icon on both sides */
  const arrowStyle: {
    [key: string]: string
  } = {
    display: props?.arrow === false ? 'none' : 'block',
    top: props?.arrowWidth ? `calc(50% - ${props.arrowWidth}px)` : 'calc(50% - 20px)',
    width: props?.arrowWidth ? `${props.arrowWidth}px` : '20px',
    height: props?.arrowWidth ? `${props.arrowWidth}px` : '20px',
    borderWidth: props?.arrowBorderWidth ? `${props.arrowBorderWidth}px` : '2px'
  }

  /* return jsx for item in carousel */
  function itemJSX(children: React.ReactNode[]): React.ReactNode[] {
    return children.map((v, k) => (
      <div
        className="reactStandardCarousel__item"
        style={{
          width: `${carouselInlineWidth}px`,
          height: `${carouselInlineHeight}px`
        }}
        key={k}>
        {v}
      </div>
    ))
  }

  return (
    <div
      className="reactStandardCarousel"
      ref={carousel}
      onTouchStart={ontouchstart}
      onTouchMove={ontouchmove}
      onTouchEnd={ontouchend} >

      <div
        className="reactStandardCarousel__arrow--left"
        style={arrowStyle}
        onClick={() => handle('before')}/>
      <div
        className="reactStandardCarousel__arrow--right"
        style={arrowStyle}
        onClick={() => handle('next')}/>

      <div className="reactStandardCarousel__dotsBox">
        {
          Array(childrenLength).fill(null).map((_, k) => k).map((v: number) => (
            <div
              className={
                v + 1 === showItemIndex
                  ? "reactStandardCarousel__dot--selected"
                  : "reactStandardCarousel__dot"
              }
              style={{
                display: props?.dots === false ? 'none' : 'block',
                width: props?.dotWidth ? `${props.dotWidth}px` : '6px',
                height: props?.dotWidth ? `${props.dotWidth}px` : '6px',
                margin: props?.dotMargin ? `${props.dotMargin}px` : '5px',
                borderWidth: props?.dotBorderWidth ? `${props.dotBorderWidth}px` : '2px'
              }}
              onClick={() => setShowItemIndex(v + 1)}
              key={v} />
          ))
        }
      </div>

      <div
        className="reactStandardCarousel__inline"
        style={{
          transform: `translateX(-${inlinePos}px)`,
          width: `${carouselInlineWidth * childrenLengthIncludeDummy}px`,
          transition: `${transition}ms linear`
        }}>
        { itemJSX(React.Children.toArray(props.children).slice(-1)) /* first dummy */ }
        { itemJSX(React.Children.toArray(props.children)) }
        { itemJSX(React.Children.toArray(props.children))[0] /* last dummy */ }
      </div>
    </div>
  );
}

export default App;
