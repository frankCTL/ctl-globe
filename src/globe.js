import React from "react";
import Globe from "react-globe.gl";
import number from "numeral";

export function GlobeComponent() {
  const [countries, setCountries] = React.useState({ features: [] });
  const [hoverD, setHoverD] = React.useState();

  React.useEffect(() => {
    fetch(
    //   "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"
      "https://raw.githubusercontent.com/frankCTL/ctl-globe/main/dataset/ne_110m_admin_0_countries.geojson?token=GHSAT0AAAAAAB2CVNU2VMEBW4UJ7DNXLIT4Y5W3B4Q"
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
            <div style="font-family: 'Open sans', sans-serif;font-size: 13px;line-height: 16px;color: #3E4850;">
              Visitors: ${number(d.POP_EST).format("0a")}
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
