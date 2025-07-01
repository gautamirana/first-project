import React, { useRef, useEffect, useState } from 'react';

const images = [
  'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
  'http://www.catster.com/wp-content/uploads/2017/06/small-kitten-meowing.jpg',
  'https://d4n5pyzr6ibrc.cloudfront.net/media/27FB7F0C-9885-42A6-9E0C19C35242B5AC/4785B1C2-8734-405D-96DC23A6A32F256B/thul-90efb785-97af-5e51-94cf-503fc81b6940.jpg?response-content-disposition=inline',
  'https://www.pets4homes.co.uk/images/articles/771/large/cat-lifespan-the-life-expectancy-of-cats-568e40723c336.jpg',
  'http://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg'
];

function Carousel({ speed = 30, images }) {
  const [panels, setPanels] = useState(images.map((img, i) => ({ img, key: i })));
  const [lefts, setLefts] = useState(images.map((_, i) => i * 100));
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLefts(prevLefts => {
        let newLefts = prevLefts.map(l => l - 0.5);
        // If the first panel is out of view, move it to the end
        if (newLefts[0] <= -100) {
          newLefts.push(newLefts.shift() + panels.length * 100);
          setPanels(prev => {
            let moved = prev.shift();
            return [...prev, moved];
          });
        }
        return newLefts;
      });
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [panels.length, speed]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '300px',
      overflow: 'hidden',
      background: '#222'
    }}>
      {panels.map((panel, i) => (
        <div
          key={panel.key}
          style={{
            position: 'absolute',
            top: 0,
            left: `${lefts[i]}%`,
            width: `${100 / panels.length}%`,
            height: '100%',
            backgroundImage: `url(${panel.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'left 0.01s linear'
          }}
          className="panel"
        />
      ))}
    </div>
  );
}

export default function CarouselDemo() {
  return (
    <div>
      <h2 style={{textAlign: 'center'}}>React Infinite Carousel</h2>
      <Carousel speed={15} images={images} />
    </div>
  );
}