import React, { Fragment } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './Carousel.scss'

const WelcomeInstructions = () => (
  <Fragment>
    <h1>Instructions</h1>
    <Carousel>
      <Carousel.Item>
        <div className="slide-content">
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </Carousel.Item>
    </Carousel>
  </Fragment>
)

export default WelcomeInstructions
