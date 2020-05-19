import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Segment,
  Grid,
  Icon,
} from "semantic-ui-react";
import "../../App.css";
import Top_tile from "../Top_tile";
import Scrolling_tile from "../Scrolling_tile";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


class Landing extends Component {

  constructor() {
    super();
    this.state = {
      resumes_2020: [],
      resumes_2019: [],
      response: '',
      responseToPost: '',
    }
  }

  componentDidMount = () => {
    fetch('/api/getAllResumes/senior/2020')
    .then(res => res.json())
    .then(
      (result) => {
        console.log("type of result " + typeof(result))
        console.log(result); 
        // const resumes_arr = JSON.stringify(result);
        // console.log("result is " + resumes_arr);
        // console.log("type of resumes_arr" + typeof(resumes_arr)) 
        this.setState({
          resumes_2020: result
        });
      },
     
      (error) => {
        console.log("error is " + error);
      }
    )

    fetch('/api/getAllResumes/senior/2019')
      .then(res => res.json())
      .then(
        (result) => {
          console.log("type of result " + typeof(result))
          console.log(result);  
          this.setState({
            resumes_2019: result
          });
        },
        
        (error) => {
          console.log("error is " + error);
        }
      )
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  renderScrollingTiles = (resumes, buffer) => {
    let gridValues = []
    let temp = []
    let index = 0;
    let slideIndex = 0;
    if (Array.isArray(resumes)) {
      resumes.forEach((i) => {
        if (index < 4) {
          temp.push(i)
          index+=1
        } else {
          index = 0
          gridValues.push(this.createResumeSlide(temp, buffer + gridValues.length - 1, slideIndex))
          slideIndex+=1
        }
      })
    } else if (resumes.length === 1) {
        gridValues.push(this.createResumeSlide(resumes, buffer))
    }

    return gridValues
  }

  createResumeSlide = (resumes, key, index) => {
    let gridValues = []
    if (Array.isArray(resumes)) {
      resumes.forEach((i) => {
        gridValues.push(this.createResumeCard(i, key))
      })
    }

    return (
      <Slide className="slider-card" index={ index }>
        { gridValues }
      </Slide>
    )
  }

  createResumeCard = (resume, key) => {
    return (
      // <Slide className="slider-card" index={ key - buffer }>
        <Scrolling_tile name={ resume.name } 
                        class={ resume.class } 
                        index={ key + 1 }
                        pic={ resume.profilePicUrl }
        />
      // </Slide>
    )
  }

  render() {
    return (
      <div className="App">

      {/* main landing page */}
      <Segment vertical textAlign="left" id="top-section">
        <Grid divided='vertically' id="main-grid">
          <Grid.Row stackable columns={2}>
            <Grid.Column mobile={16} tablet={16} computer={8} className="left-column">
              <Segment vertical textAlign="left" className="segment-content">

                <Container className="container-content">
                  <Header className="main-header" inverted as="h1">
                    The Anti-Resume Project
                  </Header>
                    <p className="main-content">
                      The goal of this project is to highlight both failures and accomplishments of people at Penn that
                      wouldn’t normally show up on a resume, and to promote the message that we are more than our resume,
                      our GPA, our internship, or our job. The Signal is currently sharing anti-resumes of Penn alumni
                      and students in an effort to promote discussion and reflection on what failure really means.
                    </p>
                  <Button id="submit-button" size="huge">SUBMIT AN ANTI-RESUME<Icon name='arrow right' /></Button>

                </Container>

            </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8} className="right-column">
              <Segment vertical textAlign="center" className="tile-segment">

              <Top_tile/>

              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* TODO: put this at the bottom of the landing page */}

      </Segment>

      {/* video page */}
      <Segment id="video" vertical textAlign="center">
        <Container className="video-content">
        <Header as="h2">More About the Project </Header>

        <iframe className="video-screen" width="560" height="315" style={{border:"none", overflow:"hidden"}} scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fjointhesignal%2Fvideos%2F2073803059583829%2F&show_text=0&width=560" ></iframe>


        <p>In Spring 2019, we interviewed a dozen graduating seniors on their failures at Penn.</p>

        </Container>



      </Segment>

      <Segment vertical textAlign="center" id="carousel">

      <Segment basic padded id="scroll_section">
      <Button className="top_button" href="#2020">SENIORS</Button>
      <Button className="top_button" href="#2019">ALUMNI</Button>
      {/* <Button className="top_button">PROFESSORS</Button> */}
      </Segment>


      {/*First carousel*/}


      <CarouselProvider className="carousel-container"
        naturalSlideWidth={100}
        naturalSlideHeight={80}
        totalSlides={6}
        visibleSlides={4}
        infinite="true">
        <div className="carousel-header" id="2020">
          <h4 className="classYear">2020</h4>
          <p><a href="/all/#2020">See All</a></p>
        </div>
        <Slider className="slider_test">
          {/* { this.renderScrollingTiles(this.state.resumes_2020, 0)} */}
          <Slide index={0}>
            <Scrolling_tile />
            <Scrolling_tile />
            <Scrolling_tile />
            <Scrolling_tile />
          </Slide>
          <Slide index={1}><Scrolling_tile /></Slide>
          <Slide index={2}><Scrolling_tile /></Slide>
          <Slide index={3}><Scrolling_tile /></Slide>
          <Slide index={4}><Scrolling_tile /></Slide>
          <Slide index={5}><Scrolling_tile /></Slide>
        </Slider>
        <ButtonNext className="buttonPanel" icon>
          <Icon name='arrow right' />
        </ButtonNext>
      </CarouselProvider>

      <CarouselProvider className="carousel-container-mobile"
        naturalSlideWidth={100}
        naturalSlideHeight={80}
        totalSlides={6}
        visibleSlides={1}
        infinite="true">
        <div className="carousel-header">
          <h4 className="classYear">2020</h4>
        </div>
        <Slider className="slider_test">
          { this.renderScrollingTiles(this.state.resumes_2020, 0)}
        </Slider>
        <ButtonNext className="buttonPanel" icon>
          <Icon name='arrow right' />
        </ButtonNext>
      </CarouselProvider>


      {/*Second carousel*/}

      <CarouselProvider className="carousel-container"
        naturalSlideWidth={100}
        naturalSlideHeight={80}
        totalSlides={6}
        visibleSlides={4}
        infinite="true">
        <div className="carousel-header" id="2019">
          <h4 className="classYear">2019</h4>
          <p><a href="/all/#2019">See All</a></p>
        </div>
        <Slider className="slider_test">
          { this.renderScrollingTiles(this.state.resumes_2019, this.state.resumes_2020.length) }
        </Slider>

        <ButtonNext className="buttonPanel" icon>
          <Icon name='arrow right' />
        </ButtonNext>

      </CarouselProvider>

      <CarouselProvider className="carousel-container-mobile"
        naturalSlideWidth={100}
        naturalSlideHeight={80}
        totalSlides={6}
        visibleSlides={1}
        infinite="true">
        <div className="carousel-header">
          <h4 className="classYear">2019</h4>
        </div>
        <Slider className="slider_test">
          { this.renderScrollingTiles(this.state.resumes_2019, this.state.resumes_2020.length) }
        </Slider>

        <ButtonNext className="buttonPanel" icon>
          <Icon name='arrow right' />
        </ButtonNext>

      </CarouselProvider>

      </Segment>

      {/* footer */}
      <Segment basic id="footer-seg" vertical as="footer" textAlign="center">
        <div className="footer-text">
          Made with ♡ in Philadelphia by  {" "}
          <a className="footer-p" href="https://thesign.al">
          The Signal </a>
          .
          </div>


      </Segment>


      </div>
    );
  }
}

export default Landing;
