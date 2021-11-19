const getLocationInfo = (e) => {
  // get postal code value from input
  const postCode = document.querySelector('.zip').value;

  //fetch data
  fetch(`https://api.zippopotam.us/ZA/${postCode}`)
    .then(response => {
      if(response.status != 200) {
        document.querySelector('.output').innerHTML = 
        `
          <div class='alert alert-danger role='alert'>
          invalid post code please try again
          </div>
        `;
      throw Error(response.statusText)
      } else {
        return response.json();
      };
    })
    .then(data => {
      //show location info
      let output = '';
      data.places.forEach(place => {
        output += `

        <div class="card border-success mb-3">
          <div class="card-header">
            Location Info
          </div>
          <div class="card-body text-success">
            <ul class="card-text">
              <strong>City: </strong> ${place['place name']}
            </ul>
            <ul class="card-text">
              <strong>Longitude: </strong> ${place['longitude']}
            </ul>
            <ul class="card-text">
              <strong>Latitude: </strong> ${place['latitude']}
            </ul>
          <div>
        </div>

        `;
      });

      // insert into output div
      document.querySelector('.output').innerHTML = output;

    })
    .catch(err => {
      console.log(err);
    });

  e.preventDefault();
};


document.querySelector('#zipform').addEventListener('submit', getLocationInfo);

