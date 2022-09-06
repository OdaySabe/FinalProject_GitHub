let names = [];
const listOfCitiesImages = async function (request, response, next) {
  await axios.get("https://api.teleport.org/api/urban_areas").then((result) => {
    result.data._links["ua:item"].map((city, index) => {
      if (index != 92) {
        names.push(
          city.name
            .toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll(".", "")
            .replaceAll(",", "")
        );
      }
    });
  });

  let NamesOfCites = names.map((city, index) => {
    return `https://api.teleport.org/api/urban_areas/slug:${city}/images`;
  });
  imagesURL = [];
  promises = [];
  for (let i = 0; i < names.length; i++) {
    promises.push(axios.get(NamesOfCites[i]));
  }
  Promise.all(promises)
    .then((result) => {
      imagesURL = result;
      request.URLS = imagesURL.map((img) => {
        return img.data.photos[0].image.mobile;
      });
      console.log("Image middleware done");
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
const listOfCitiesDetails = async (request, response, next) => {
  let details = [];
  let promises = [];
  for (let i = 0; i < names.length; i++) {
    promises.push(
      axios.get(`https://api.teleport.org/api/urban_areas/slug:${names[i]}/`)
    );
  }
  details = await Promise.all(promises);
  request.details = details.map((data) => {
    return {
      continent: data.data.continent,
      FullName: data.data.full_name,
      mayor: data.data.mayor,
      boundingBox: data.data.bounding_box.latlon,
    };
  });
  console.log("details middleware done");
  next();
};
const hookData = function (request, response, next) {
  request.Final = [];
  console.log(request.URLS.length + " request.URLS.length");
  console.log(request.details.length + " request.details.length");
  for (i = 0; i < names.length; i++) {
    request.Final[i] = {
      CityimageSrc: request.URLS[i],
      CityDetails: request.details[i],
    };
  }
  next();
};
const saveToDataBase = function (request, response, next) {
  console.log(request.Final.length + " request.Final.length");
  for (let i = 0; i < request.Final.length; i++) {
    new allCities({
      CityimageSrc: request.Final[i].CityimageSrc,
      CityDetails: {
        continent: request.Final[i].CityDetails.continent,
        FullName: request.Final[i].CityDetails.FullName,
        mayor: request.Final[i].CityDetails.mayor,
        boundingBox: {
          east: request.Final[i].CityDetails.boundingBox.east,
          north: request.Final[i].CityDetails.boundingBox.north,
          south: request.Final[i].CityDetails.boundingBox.south,
          west: request.Final[i].CityDetails.boundingBox.west,
        },
      },
    }).save();
  }
  console.log("saved in dataBase");
  next();
};

(module.exports = names),
  listOfCitiesImages,
  listOfCitiesDetails,
  hookData,
  saveToDataBase;
//server.use(listOfCitiesImages, listOfCitiesDetails, hookData, saveToDataBase);
