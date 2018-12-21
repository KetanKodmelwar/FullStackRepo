import React, { Component } from "react";

import axios from "axios";

class Photo extends Component {
  constructor(props) {
      console.log("Changinf hweewe",props.imagePreview );
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component

    
    this.state = {
      imageView: [props.imagePreview],
      imgView: []
    };
  }

  componentDidMount() {
    console.log(this.state.imageView);
    
      axios
        .post(
          "http://localhost:3000/download/" +
            this.state.imageView
        )
        .then(response => {
          console.log("Image Res : ", response);
          let imagePreview = "data:image/jpg;base64, " + response.data;

          this.setState({
            imgView: this.state.imgView.concat(imagePreview)
          });
        });
    
  }
  render() {
    let count = 0;
    let image = this.state.imgView.map(images => {
      if (count == 0) {
        count++;

        return (
          <div
            class="carousel-item active"
            style={{ width: "100%", height: "100%" }}
          >
            <img
              class="d-block w-100"
              src={images}
              style={{ width: "100%", height: "100%" }}
              alt="First slide"
            />
          </div>
        );
      } else {
        return (
          <div class="carousel-item" style={{ width: "100%", height: "100%" }}>
            <img
              class="d-block w-100"
              src={images}
              style={{ width: "100%", height: "100%" }}
              alt="Second slide"
            />
          </div>
        );
      }
    });
    return (
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
        style={{ width: "100%", height: "100%" }}
      >
        <div class="carousel-inner" style={{ width: "100%", height: "100%" }}>
          {image}
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
          onclick="$('#myCarousel').carousel('prev')"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true" />
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
          onclick="$('#myCarousel').carousel('next')"
        >
          <span class="carousel-control-next-icon" aria-hidden="true" />
          <span class="sr-only">Next</span>
        </a>
      </div>
    );
  }
}
export default Photo;