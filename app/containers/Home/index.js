import React, { Component } from 'react'
import Radium, {StyleRoot} from 'radium'
import Helmet from '../../components/HelmetContainer'
import COPY from '../../constants/copy'
import ScrollAnim from 'rc-scroll-anim'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import Animate from 'rc-animate'
const ScrollOverPack = ScrollAnim.OverPack
const ScrollParallax = ScrollAnim.Parallax
const EventListener = ScrollAnim.Event
import Introduction from '../../components/Introduction'
import Experience from '../../components/Experience'
import styles from './styles'

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyleRoot>
        <div style={styles.container}>
          <Helmet
            title='Home'
            fonts={['300', '400', '800']}
          />
          <Introduction
            copy={COPY.introduction}
          />

          <Experience
            copy={COPY.experience}
          />

          <ScrollOverPack
            className="pack-page page3"
            style={{ backgroundColor: 'purple', height: '100%', width: '100%' }}
            always={false}
            id="page3"
            playScale={1}
            hideProps={{ t: { reverse: true }, 1: { reverse: true } }}
          >
            <TweenOne
              animation={{ opacity: 1, top: 200 }}
              key="t"
              className="tween-one"
              style={{ opacity: 0, top: 0, position: 'relative' }}
            >
              Page 3
            </TweenOne>
            <Animate key="0" transitionName="fade" transitionAppear>
              <div className="demo"></div>
            </Animate>
            <TweenOne
              className="demo"
              animation={{ y: 0, opacity: 1 }}
              key="1"
              style={{ transform: 'translateY(100px)', opacity: 0 }}
            />
          </ScrollOverPack>
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(Home);
