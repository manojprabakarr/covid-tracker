import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const statPrettier = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

const casesTypesColor = {
  cases: {
    hex: "#cc1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const showDataOnMap = (data, casesType = "cases") =>
data.map((country) => (
    <Circle
      center={[country.countryInfo.lat,country.countryInfo.long]}
      color={casesTypesColor[casesType].hex}
      fillColor={casesTypesColor[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypesColor[casesType].multiplier
      }
    >
      <Popup>
        <div className="info_container">
          <div
            className="info_flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info_name">{country.country}</div>
          <div className="info_cases">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info_rec">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info_deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));