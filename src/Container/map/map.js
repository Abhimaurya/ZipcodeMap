import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from '../map/marker';
class Map extends Component {
  constructor(props){
    super(props)
    this.state={
      lat:this.props.lat,
      lng:this.props.lng
    }
  }
    render() {
    const MapShow = withGoogleMap(props => (
       <GoogleMap
         defaultCenter = { { lat: this.state.lat, lng: this.state.lng } }
         defaultZoom = { 13 }
       >
         {/* used for Google map marker */}
          <Marker
            lat={this.state.lat}
            lng={this.state.lng}
            name="Location"
            color="Red"
          />
       </GoogleMap>
    ));
    return(
       <div>
         <MapShow
           containerElement={ <div style={{ height: `500px`, right:'30px',bottom:'30px', width: '500px' ,float:'right' ,top: '100px',position:'relative'}} /> }
           mapElement={ <div style={{ height: `100%` }} /> }
         />
       </div>
    );
    }
 };
export default Map;