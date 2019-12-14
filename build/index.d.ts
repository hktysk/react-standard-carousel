import React from 'react';
import './style.css';
declare type Props = {
    children: React.ReactNode;
    dots?: boolean;
    dotWidth?: number;
    dotMargin?: number;
    dotBorderWidth?: number;
    arrow?: boolean;
    arrowWidth?: number;
    arrowBorderWidth?: number;
    transition?: number;
    autoPlay?: boolean;
    autoPlayMsec?: number;
};
declare const App: React.FC<Props>;
export default App;
