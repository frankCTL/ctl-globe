import React from "react";
import Globe from "react-globe.gl";

export function GlobeComponent() {
  const [countries, setCountries] = React.useState({ features: [] });
  const [hoverD, setHoverD] = React.useState();

  React.useEffect(() => {
    fetch(
"https://raw.githubusercontent.com/frankCTL/ctl-globe/main/dataset/locations.geojson"
    )
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      polygonsData={countries.features.filter(
        (d) => d.properties.ISO_A2 !== "FR"
      )}
      pointsData={[]}
      pointAltitude={() => 0.1}
      polygonAltitude={() => 0.10}
      polygonCapColor={(d) => (d === hoverD ? "#1B1D1F" : "#cf2e2e")}
      polygonSideColor={() => "rgba(222,225,228,.6)"}
      polygonStrokeColor={() => "#cf2e2e"}
      polygonLabel={function ({ properties: d }) {
        return `
          <div style="min-width: 108px; padding: 10px 14px;background: #FFFFFF;border: 1px solid #E5E5E5;box-shadow: 0px 2px 20px rgba(32, 32, 35, 0.13);border-radius: 4px;">
            <div style="font-family: 'Open sans', sans-serif; margin-bottom:10px;font-weight: 600;font-size: 13px;line-height: 16px;text-transform: capitalize;color: #2D3032;">
              ${d.ADMIN}
            </div>
          </div>
        `;
      }}
      pointOfView={
        ({
          lat: 0,
          lng: 0,
          altitude: 0.2
        },
        1000)
      }
      onPolygonHover={setHoverD}
    />
  );
}
