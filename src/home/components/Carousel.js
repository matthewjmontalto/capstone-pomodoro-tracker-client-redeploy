import React, { Fragment } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './Carousel.scss'

const WelcomeInstructions = () => (
  <Fragment>
    <h2>Instructions</h2>
    <hr/>
    <Carousel>
      <Carousel.Item>
        <div className="slide-content">
          <h3>What the heck is it?!</h3>
          <hr/>
          <p>Well, since you asked, a pomato is a potato plant with a tomato
          plant grafted onto it, so as to increase crop efficiency and tomato yield.
          Pretty cool, right?</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-content">
          <h3>Um, no really...</h3>
          <hr/>
          <p>
            Well, much like the pomato, this application is designed to increase
            your efficiency by applying the pomodoro time management technique
            to your tasks!
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-content">
          <h3>What is the Pomodoro Technique?</h3>
          <hr/>
          <p>
            There are six steps in the original technique:
          </p>
          <ol>
            <li>Decide on a task to be done.</li>
            <li>Set the pomodoro timer—usually 25 minutes.</li>
            <li>Work on the task.</li>
            <li>End work when the timer expires and tally the session.</li>
            <li>If you have fewer than four sessions, take a five minute break and return to step 2.</li>
            <li>After four sessions, take a 15-minute break, then start all over.</li>
          </ol>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-content">
          <h3>Great! How do I get started?</h3>
          <hr/>
          <p>
            To start, create an account, so that you can keep your tasks wholey yours.
            If you already have an account, simply log in.
          </p>
          <p>
            <strong>WARNING</strong>: This application is a toy. Do not use login information that
            you are using anywhere else!
          </p>
          <p>
            Once logged in, click on {'"My Tasks"'} in the navigation bar. If
            you previously created tasks, they will be listed here. If not, choose
            to add a task. You may return to these instructions any time via {'"Home"'}.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-content">
          <h3>Using the tracker</h3>
          <hr/>
          <p>
            When you first create a task, you will be returned to {'"My Tasks"'} list.
            While here, you may choose to start working on your task by initiating
            the timer for the given task. When you complete the task,
            simply click the check-mark to mark the task as completed.
          </p>
          <p>
            Alternately, you may {'"detail"'} into the task by selecting the {'task\'s'} title.
            In the task detail, you also have options to edit or delete your task.
          </p>
          <p>
            While working on your task, the application will keep track of the
            number of sessions and break times will reflect the count automatically.
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  </Fragment>
)

export default WelcomeInstructions
