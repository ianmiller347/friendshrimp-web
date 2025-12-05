import { useEffect, useState, RefObject } from 'react';
import ReactGA from 'react-ga';
import Shrimps, { ShrimpProps } from './Shrimps';
import { getRandomInt } from '../../util/rng';
import * as shrimpSound from '../../audio/addShrimp.mp3';
import ShrimpObjects from '../../components/Shrimp/ShrimpObjects';
import './ShrimpsClicks.scss';

const SHRIMPS_ARRAY_SIZE = ShrimpObjects.shrimpCount;

interface ShrimpsClicksProps {
  parentRef: RefObject<HTMLDivElement | null>;
}

const ShrimpsClicks = ({ parentRef }: ShrimpsClicksProps) => {
  const [shrimps, setShrimps] = useState<ShrimpProps[]>([]);
  const [weShrimpin, setUsShrimpin] = useState(false);

  const { location } = window;
  const { pathname, search } = location;

  useEffect(() => {
    ReactGA.initialize('UA-37792076-2');
    ReactGA.pageview(`${pathname}${search}`);
  }, [pathname, search]);

  const createShrimpSound = () => {
    const newShrimpSound = new Audio(shrimpSound.default);
    newShrimpSound.play();
  };

  useEffect(() => {
    const parentContainer = parentRef.current;
    if (!parentContainer) return;

    const addAShrimp = (e: MouseEvent) => {
      createShrimpSound();
      const leftOffset = e.pageX;
      const topOffset = e.pageY;
      const shrimpId = Math.floor(Math.random() * SHRIMPS_ARRAY_SIZE + 1);

      setShrimps((prevShrimps) => {
        const numberOfShrimpsSoFar = prevShrimps.length;

        if (numberOfShrimpsSoFar > 69) {
          setUsShrimpin(true);
          ReactGA.event({
            category: 'shrimp',
            action: 'Clicked lots of shrimps!',
            value: 1,
          });
        }

        ReactGA.event({
          category: 'shrimp',
          action: 'click',
          value: 1,
        });

        const shrimpIndex = numberOfShrimpsSoFar;
        const rotation = shrimpIndex % 2 === 0 ? getRandomInt(0, 180) : 0;

        const shrimpProps: ShrimpProps = {
          shrimpNumber: shrimpId,
          leftOffset: leftOffset,
          topOffset: topOffset,
          rotation,
          index: shrimpIndex,
          key: `index__${shrimpIndex}__shrimp_${shrimpId}`,
        };

        return [...prevShrimps, shrimpProps];
      });
    };

    parentContainer.addEventListener('click', addAShrimp);

    return () => {
      parentContainer.removeEventListener('click', addAShrimp);
    };
  }, [parentRef]);

  return (
    <>
      {weShrimpin && (
        <div className="we-shrimpin">
          <h3>You are shrimpin!!!</h3>
          <p>
            You are really addin a lot of shrimps on here my friend i just want
            to say it&apos;s a good job thank you my friend!
          </p>
        </div>
      )}
      <Shrimps shrimps={shrimps} />
    </>
  );
};

export default ShrimpsClicks;
