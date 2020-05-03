import peaks from 'peaks.js';

export const init = () => {
  (function(Peaks) {
    var options = {
      containers: {
        zoomview: document.getElementById('zoomview-container'),
        overview: document.getElementById('overview-container')
      },
      mediaElement: document.getElementById('audio'),
      dataUri: {
        arraybuffer: 'test.dat',
      },
      keyboard: true,
      pointMarkerColor: '#006eb0',
      showPlayheadTime: true
    };

    Peaks.init(options, function(err, peaksInstance) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log("Peaks instance ready");

      document.querySelector('[data-action="zoom-in"]').addEventListener('click', function() {
        peaksInstance.zoom.zoomIn();
      });

      document.querySelector('[data-action="zoom-out"]').addEventListener('click', function() {
        peaksInstance.zoom.zoomOut();
      });
    });
  })(peaks);
};