const getTargetVolume = require('../services/getTargetVolume');
const data = require('../../data/volumes.json');

module.exports = (saved) => `
<html>

  <head>
    <title>Volume controller</title>
    <style>
      body {
        font-family: sans-serif;
        text-align: center;
        padding: 0;
        margin: 0;
        background: #cecece;
      }

      main {
        margin: 60px auto;
        max-width: 400px;
        padding: 40px;
        border: 1px solid #9c9c9c;
        background: #ffffff;
        border-radius: 4px;
      }

      label {
        display: inline-block;
        width: 70px;
      }

      .display {
        display: inline-block;
        width: 40px;
      }

      .saved {
        display: inline-block;
        border: 1px solid green;
        background: #4CAF50;
        margin: 20px 0 30px;
        border-radius: 4px;
        color: white;
        padding: 20px 100px;
      }

      input[type="submit"] {
        display: inline-block;
        margin-top: 20px;
        padding: 20px 60px;
        border: 1px solid #cecece;
        border-radius: 4px;
        font-size: 14px;
        transition: 0.2s;
        outline: none;
      }

      input[type="submit"]:hover {
        background: #cecece;
        border-color: gray;
      }
    </style>
  </head>

  <body>
    <main>
      <h1>Volume controller</h1>
      <p>current volume: <strong>${getTargetVolume() * 100}%</strong></p>

      ${saved ? `
        <div class="saved">
          Your changes are saved!
        </div>
      ` : ''}

      <p>Change the audio with the slides below. It will fade slowly to the new volume during the entire hour. Make sure the first and the last slider always have the same volume.</p>

      <form action="." method="POST">
        ${Object.entries(data).map(([time, value]) => `
        <label>${time}:00</label>
        <input data-displayid="display-${time}" name="${time}" type="range" min="0" max="20" value="${value * 20}" />
        <div class="display" id="display-${time}">${Math.round(value * 100)}%</div>
        <br />
        `).join('')}
        <input type="submit" value="Save" />
      </form>
    </main>

    <script>
      const sliders = [...document.querySelectorAll('input[type="range"]')];
      sliders.map(slider => {
        slider.addEventListener('mousemove', () => {
          const display = document.getElementById(slider.dataset.displayid);
          display.innerHTML = (slider.value * 5) + "%";
        });
      });
    </script>
  </body>

</html>
`
