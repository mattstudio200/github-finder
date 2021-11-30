import React, {Component, Fragment} from 'react';
import './App.css';

class App extends Component {

  render() {
    const firstName = "Matthew";
    const lastName = "Shirtliffe";
    const name = `${firstName} ${lastName}`
    const loading = true;
    const showName = true;

    return (      
    <Fragment>
      {loading ?  <h1>Loading....</h1> :
      <h1>Hello {showName ? name : 'Stranger'}</h1>}
    </Fragment>
    );

    // if(loading){
    //   return (      
    //     <h1>Loading....</h1>
    //     );
    // }

    // return (      
    // <Fragment>
    //   <h1>Hello {name}</h1>
    // </Fragment>
    // );

    // {showName ? name : 'Stranger'}
    // {showName ?? name} cam be
  }
}

export default App;
