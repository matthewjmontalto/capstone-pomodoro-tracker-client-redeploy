import React, { Fragment } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './Carousel.scss'

const WelcomeInstructions = () => (
  <Fragment>
    <h1>Instructions</h1>
    <Carousel>
      <Carousel.Item>
        <div className="slide-content">
          <h3>What the heck is it?!</h3>
          <p>Well, since you asked, a pomato is a potato plant with a tomato
          plant grafted onto it to increase crop efficiency and tomato yield.
          Pretty cool, right?</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-content">
          <h3>Um, no really...</h3>
          <p>Oh this old thing! Yes. </p>
        </div>
      </Carousel.Item>
    </Carousel>
  </Fragment>
)

export default WelcomeInstructions
