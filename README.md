<p align="center">
  <img src="https://github.com/hktysk/images/blob/master/react-standard-carousel/screen-shot.png?raw=true">
</p>

# *react-standard-carousel*
> this carousel is simple and minimum that use in many situations.

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

### Tech
* [Node.js](https://github.com/nodejs/node)
* [React](https://github.com/facebook/react)
* [TypeScript](https://github.com/microsoft/TypeScript)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [Jest](https://github.com/facebook/jest)
* [enzyme](https://github.com/airbnb/enzyme)
* [use-interval](https://github.com/Hermanya/use-interval#readme)

### Installation
```sh
npm install [--save-dev] react-standard-carousel
```

### Usage
```js
import React from 'react';
import Carousel from 'react-standard-carousel';

const App = () => {
  return (
    <div style={{width: '400px', height: '600px'}}>
      <Carousel>
        <img src="/img/example1.jpg" />
        <img src="/img/example2.jpg" />
        <img src="/img/example3.jpg" />
      </Carousel>
    </div>
  );
}

export default App;
```

or

```js
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-standard-carousel';

const App = () => {
  return (
    <div style={{width: '400px', height: '600px'}}>
      <Carousel>
        <div className="slide">
          <img src="/img/example1.jpg" />
          <Link to="/christmas" className="slide__title">
            MERRY CHRISTMAS
          </Link>
        </div>
        <div className="slide">
          <img src="/img/example2.jpg" />
          <Link to="/santa-claus" className="slide__title">
            Let's gift to Santa Claus
          </Link>
        </div>
      </Carousel>
    </div>
  );
}

export default App;
```

**TypeScript:**

```js
import React from 'react';
import Carousel from 'react-standard-carousel';

const App: React.FC = () => {
  return (
    <div style={{width: '400px', height: '600px'}}>
      <Carousel>
        <img src="/img/example1.jpg" />
        <img src="/img/example2.jpg" />
        <img src="/img/example3.jpg" />
      </Carousel>
    </div>
  );
}

export default App;
```

### Props
```js
<Carousel
  dots={true}
  dotWidth={6}
  dotMargin={5}
  dotBorderWidth={2}
  arrow={true}
  arrowWidth={20}
  arrowBorderWidth={2}
  transition={300}
  autoPlay={true}
  autoPlayMsec={3000} >
```
| Props | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| children | [string\|node] | | Yes | Children is a special React property. |
| dots | boolean | true | No | Show dots or hide. |
| dotWidth | number | 6 | No | Width and height of dot. unit is 'px'. |
| dotMargin | number | 5 | No | Margin of dot. unit is 'px'. |
| dotBorderWidth| number | 2 | No | Width of border for dot. unit is 'px'. |
| arrow | boolean | true | No | Show arrow icon or hide. |
| arrowWidth | number | 20 | No | Width and height of arrow icon. unit is 'px'. |
| arrowBorderWidth | number | 2 | No | Width and height of border for arrow icon. unit is 'px'. |
| transition | number | 300 | No | Time that during move carousel. unit is 'msec'. |
| autoPlay | boolean | false | No | Start with auto. |
| autoPlayMsec | number | 3000 | No | Interval. unit is 'msec'. |

### Example
```sh
$ git clone git://github.com/hktysk/react-standard-carousel.git
$ cd react-standard-carousel
$ npm install
$ npm start
```
