import { Component } from "react";
import SingleImage from "./SingleImage";

export default class Image extends Component {
  constructor() {
    super();
    this.state = {
      selectedImages: [],
    };
  }

  addASelectedImage = (ImageId) => {
    let temp = [...this.state.selectedImages];
    temp.push(ImageId);
    this.setState({ selectedImages: temp }, () => {
      this.props.cities(this.state.selectedImages);
    });
  };
  removeCity = (imageName) => {
    let temp = [...this.state.selectedImages];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].CityDetails.FullName == imageName) {
        temp.splice(i, 1);
      }
    }

    this.setState({ selectedImages: temp }, () => {
      this.props.cities(this.state.selectedImages);
    });
  };
  checkIfHavingPlans = () => {
    if (this.props.LoggedUser && this.state.selectedImages != null) {
      return (
        <div>
          <hr></hr>
          <h1>Your Selected Cities</h1>
          <div className="selectedCites">
            {this.state.selectedImages.map((image) => {
              return (
                <div>
                  <img
                    className="imageOfSelectedCites"
                    src={image.CityimageSrc}
                  />
                  <p>{image.CityDetails.FullName}</p>
                  <button
                    onClick={() => {
                      this.removeCity(image.CityDetails.FullName);
                    }}
                  >
                    Delete this Image
                  </button>
                </div>
              );
            })}
          </div>

          <hr></hr>
          <div className="citiesContainerForNewPlan">
            {this.props.Images.map((singleCity) => {
              let redFlag = false;
              {
                this.state.selectedImages.map((image) => {
                  if (image._id == singleCity._id) {
                    redFlag = true;
                  }
                });
              }
              return (
                <SingleImage
                  detals={singleCity.CityDetails}
                  imgSRC={singleCity.CityimageSrc}
                  selectedImages={this.state.selectedImages}
                  addASelectedImage={this.addASelectedImage}
                  redFlag={redFlag}
                  removeCity={this.removeCity}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="citiesContainer">
          {this.props.Images.map((singleCity) => {
            return (
              <SingleImage
                detals={singleCity.CityDetails}
                imgSRC={singleCity.CityimageSrc}
              />
            );
          })}
        </div>
      );
    }
  };

  render() {
    return <div>{this.checkIfHavingPlans()} </div>;
  }
}
