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
  render() {
    return !this.props.LoggedUser ? (
      <div className="citiesContainer">
        {this.props.Images.map((singleCity) => {
          return (
            <SingleImage
              detals={singleCity.CityDetails}
              imgSRC={singleCity.CityimageSrc}
              deleteImage={this.deleteImage}
            />
          );
        })}
      </div>
    ) : (
      <div>
        <hr></hr>
        <h1>Your Selected Cities</h1>
        <div className="selectedCites">
          {this.props.Images.map((singleCity) => {
            {
              return this.state.selectedImages.map((id) => {
                if (id == singleCity._id) {
                  return (
                    <SingleImage
                      detals={singleCity.CityDetails}
                      imgSRC={singleCity.CityimageSrc}
                      noLink={true}
                    />
                  );
                }
              });
            }
          })}
        </div>
        <hr></hr>
        <div className="citiesContainerForNewPlan">
          {this.props.Images.map((singleCity) => {
            let redFlag = false;
            {
              this.state.selectedImages.map((id) => {
                if (id == singleCity._id) {
                  redFlag = true;
                }
              });
            }
            return (
              <SingleImage
                detals={singleCity.CityDetails}
                imgSRC={singleCity.CityimageSrc}
                LoggedUser={this.props.LoggedUser}
                addASelectedImage={this.addASelectedImage}
                redFlag={redFlag}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
