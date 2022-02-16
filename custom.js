const { Mongoose } = require("mongoose");

M.AutoInit();
 
 document.addEventListener('DOMContentLoaded', function() {
    //var elems = document.querySelectorAll('.carousel');
    var instance = M.Carousel.init({
        numVisible: 2,
        indicators: true
  })


  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, options);
  })


  if(location.pathname.indexOf('/ranges.html') > -1){

    const loader = document.querySelector('#loader');
    loader.classList.add('loader')
    fetch('/api')
    .then(res=> res.json())
    .then(data => {
      loader.classList.remove('loader')
      let html = ''

      data.forEach(({name, img_url, description}) => {
        html += `
        <div class="col s10 m7 l4">
        <div class="card">
          <div class="card-image">
            <img src = "${img_url}">
            <span class="card-title">${name}</span>
          </div>
          <div class="card-content">
            <p>${description}</p>
          </div>
          <div class="card-action">
            <a href="calculator.html">Get Price ($)</a>
          </div>
        </div>
      </div>
        `
      })


      // to insert new card

    //  var rangesSchema = new mongoose.Schema({
     //   Range =  String,
     //   Cost = Number,
      //  Img = null,
      //  uniq = 'id' + (new Date()).getTime()
     // });

     // var rangesSchema = mongoose.model('Ranges', rangesSchema);

     // module.exports=rangesModel;

      document.querySelector('.row').innerHTML = html;
    })
    .catch(error=>{
      loader.classList.remove('loader')
      console.log(error)
      })
    }

   //$('.right-align-navbar').right-align-navbar();

});


// this is to insert new range

const form = document.querySelector('form');
const inputFile = document.querySelector('input[type=file]');
let imgFile
inputFile.addEventListener('change',(e) => {
  imgFile = e.target.files[0]
})
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const range = e.target.range.value.trim();
  const cost = e.target.cost.value.trim();
  const description = e.target.description.value.trim();
  const formdata = new FormData();

  formdata.append('image', imgFile);
  formdata.append('range', range)
  formdata.append('cost', cost)
  formdata.append('description', description)

  fetch('/api', {
    method: 'POST',
    body: formdata
  })
  .then(res=> res.json())
  .then(res => {
    if (res.acknowledged) {
      location.reload()
    }
  })
  .catch(error => console.log(error))
})



  




  