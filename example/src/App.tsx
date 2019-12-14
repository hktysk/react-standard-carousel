import React from 'react'
import Carousel from '../../src'

let departs: string[] = [];
for (let i = 1; i < 6; i++) {
  departs.push(`/images/depart-${i}.jpeg`);
}

let horizontal: string[] = [];
for (let i = 1; i < 5; i++) {
  horizontal.push(`/images/horizontal-${i}.jpeg`);
}

let suit: string[] = [];
for (let i = 1; i < 4; i++) {
  suit.push(`/images/suit-${i}.jpeg`);
}

let interior: string[] = [];
for (let i = 1; i < 3; i++) {
  interior.push(`/images/interior-${i}.jpeg`);
}

function carouselItems(images: string[]): React.ReactNode {
  return images.map(v => (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${v})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }} />
  ))
}

const App: React.FC = () => (
  <>
    <div style={{
      position: 'fixed',
      top: '1.2%',
      right: '0.75%',
      width: '8.5%',
      height: 'calc(100% - 2.9%)',
      color: 'white',
      fontSize: '250%',
      letterSpacing: '5px',
      writingMode: 'vertical-rl',
      backgroundColor: '#bd34ea',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '3%',
      boxSizing: 'border-box'
    }}>EXAMPLE</div>
    <div style={{
      width: '90.8%',
      height: '49vh',
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '0.5vh'
    }}>
      <div style={{
        position: 'relative',
        width: '63%',
        height: '100%',
      }}>
        <Carousel transition={300} autoPlay={true} autoPlayMsec={1300}>
          { carouselItems(departs) }
        </Carousel>
      </div>

      <div style={{
        position: 'relative',
        width: '16%',
        height: '100%',
      }}>
        <Carousel transition={300} autoPlay={true} autoPlayMsec={1300}>
          { carouselItems(horizontal) }
        </Carousel>
      </div>

      <div style={{
        position: 'relative',
        width: '20%',
        height: '100%',
      }}>
        <Carousel transition={300} autoPlay={true} autoPlayMsec={1300}>
          { carouselItems(suit) }
        </Carousel>
      </div>
    </div>

    <div style={{
      position: 'relative',
      width: '90.5%',
      height: '46.8vh',
      float: 'left',
      margin: '0.4vh 0.2vw'
    }}>
      <Carousel transition={300} autoPlay={true} autoPlayMsec={1300}>
        { carouselItems(interior) }
      </Carousel>
    </div>
  </>
);

export default App
