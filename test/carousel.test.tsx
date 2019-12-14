import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Carousel from '../src'

Enzyme.configure({
  adapter: new Adapter()
});

let images: string[] = []
for (let i = 1; i < 6; i++) {
  images.push(`/images/depart-${i}.jpg`)
}

describe('render carousel', () => {
  let doc: Enzyme.ShallowWrapper;
  beforeEach(() => {
    act(() => {
      doc = shallow(
        <Carousel>
          {
            images.map(v => (
              <img src={v} key={v} />
            ))
          }
        </Carousel>
      );
    });
  });

  it('show dots', () => {
    expect(doc.find('.reactStandardCarousel__dot--selected')).toHaveLength(1);
    expect(doc.find('.reactStandardCarousel__dot')).toHaveLength(4);
  });

  it('show arrows', () => {
    expect(doc.find('.reactStandardCarousel__arrow--right')).toBeTruthy();
    expect(doc.find('.reactStandardCarousel__arrow--left')).toBeTruthy();
  });

  it('show items and dummy', () => {
    expect(doc.find('img')).toHaveLength(7); // items: 5, dummy: 2
  });
});
