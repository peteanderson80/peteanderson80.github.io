function loadM1(){
  d3.select("#evaluation-choice").text("M1: Percentage of captions that are evaluated as better or equal to human caption.");
  $.getJSON( "/images/M1.json", function( data ) {
    $("#fig").empty();
    mpld3.draw_figure("fig", data);
  });
};

function loadM2(){
  d3.select("#evaluation-choice").text("M2: Percentage of captions that pass the Turing Test.");
  $.getJSON( "/images/M2.json", function( data ) {
    $("#fig").empty();
    mpld3.draw_figure("fig", data);
  });
};

function loadM3(){
  d3.select("#evaluation-choice").text("M3: Average correctness of the captions on a scale 1-5 (incorrect - correct).");
  $.getJSON( "/images/M3.json", function( data ) {
    $("#fig").empty();
    mpld3.draw_figure("fig", data);
  });
};

function loadM4(){
  d3.select("#evaluation-choice").text("M4: Average amount of detail of the captions on a scale 1-5 (lack of details - very detailed).");
  $.getJSON( "/images/M4.json", function( data ) {
    $("#fig").empty();
    mpld3.draw_figure("fig", data);
  });
};

function loadM5(){
  d3.select("#evaluation-choice").text("M5: Percentage of captions that are similar to human description.");
  $.getJSON( "/images/M5.json", function( data ) {
    $("#fig").empty();
    mpld3.draw_figure("fig", data);
  });
};

window.onload = function() {
  loadM1();
};
