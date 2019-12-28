import Map from './map/map'
import React, { Component } from 'react';

class Postal extends React.Component {

  constructor(props) {
    super(props)
    //Initialising State-->
    this.state = {
      isLoading: true,
      users: [],        
      error: null,
      isFilter: false,
      items: [],
      filterlat: 28.7041, //set initially latitude of delhi 
      filterlng: 77.1025,  //set initially longitude of delhi
      input: "",
      array:[],
      filterstate:"Delhi"
    };
    this.filterTableData = this.filterTableData.bind(this);
  }


  //Lifecycle method foe API call-->
  componentDidMount() {
    this.fetchUsers();
    console.log("vaue", this.state.users);
  }

  //Method to call API for postal Address->
  fetchUsers() {
    fetch(`https://my.api.mockaroo.com/postal-data.json?key=c9092d70`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error: true, isLoading: false }));
  }
  //Table row rendering function-->
  renderTableData() {
    console.log("stateuser", this.state.users)
    return this.state.users.map(user => {
      // const { postal_code, Longitude, state } = user;
      return (
        <tr col-span="2">
          <td>{user.postal_code}</td>
          <td>{user.Longitude}</td>
          <td>{user.Latitude}</td>
          <td>{user.state}</td>
        </tr>

      );
    })
  }

  filterTableData(e) {
    e.persist();
    const value = e.target.value;
    //set the state 
    this.setState({
      isFilter: true,
      input: value
    });



    let filtervalue = this.state.input;
    //Filter data
    let filtercontacts = this.state.users.filter((item) => {
      return item.postal_code.indexOf(filtervalue) !== -1;
    });
   this.state.array = filtercontacts.map((users,index) => {
      return (
        <tr col-span="2" key={index}>
          <td>{users.postal_code}</td>
          <td >{users.Longitude}</td>
          <td>{users.Latitude}</td>
          <td>{users.state}</td>
        </tr>
      );
    })
   // console.log("arraycheck",this.state.array[0].props.children[1]);

    this.setState({
          filterlat:parseFloat(filtercontacts[0].Latitude),
          filterlng:parseFloat(filtercontacts[0].Longitude),
          filterstate:filtercontacts[0].state
        })
        console.log("chkvalue",this.state.filterlat,this.state.filterlng);

  }

  render() {
    //Deconstructing ->
    const { isLoading, isFilter, error, input } = this.state;
    return (
      <React.Fragment>
        <h1>Postal ADDRESS MAPPING</h1>

        {/* Input search for Postal address*/}
        <input className="search-field" type="text" placeholder="Search For Postal Code" value={input} onChange={this.filterTableData.bind(this)} minlength="2" maxlength="5" />

        {/* Error handling  */}
        {error ? <p>{error}</p> : null}

        {/* Rendering the DATA in table if got reponse from API  */}
        <div className="container">
          <div class="row">
            <div className="Table-item">
              {!isLoading ? (
                <table cellspacing="0">
                  <thead>
                    <th>
                      Postal_code
                  </th>
                    <th>
                      Longitude
                  </th>
                    <th>
                      Latitude
                  </th>
                    <th>
                      State
                  </th>
                  </thead>
                  <tbody>
                    {/* For rendering table  */}
                    {!isFilter ? this.renderTableData() :this.state.array}
                  </tbody>
                </table>
              ) : (
                  <h3>Loading...</h3>
                )}
            </div>

            {/* Google MAP Rendering section */}
            <div className="Map-item">
              <Map lat={this.state.filterlat} lng={this.state.filterlng} state={this.state.filterstate} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Postal;