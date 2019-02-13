function renderSceneGraph(svg, tuples) {
  var nodes = {};
  var links = [];
  tuples.forEach(function(tuple_dict, index) {
    var tuple = tuple_dict.tuple;
    var match_class = (tuple_dict.truth_value) ? ' highlighted' : '';
    if (tuple.length == 1){
      source = nodes[tuple[0]] || (nodes[tuple[0]] = {name: tuple[0], type: 'object'});
      source.type += match_class;
    } else if (tuple.length == 2) {
      source = nodes[tuple[0]] || (nodes[tuple[0]] = {name: tuple[0], type: 'object'});
      target = nodes[tuple[1]] || (nodes[tuple[1]] = {name: tuple[1], type: 'attribute'});
      source.type += match_class;
      target.type += match_class;
      links.push({source: source, target: target, type: 'standard'+match_class});
    } else if (tuple.length == 3) {
      source = nodes[tuple[0]] || (nodes[tuple[0]] = {name: tuple[0], type: 'object'});
      interim = nodes[tuple[1]] || (nodes[tuple[1]] = {name: tuple[1], type: 'relation'});
      target = nodes[tuple[2]] || (nodes[tuple[2]] = {name: tuple[2], type: 'object'});
      source.type += match_class;
      interim.type += match_class;
      target.type += match_class;
      links.push({source: nodes[tuple[0]], target: nodes[tuple[1]], type: 'standard'+match_class});
      links.push({source: nodes[tuple[1]], target: nodes[tuple[2]], type: 'standard'+match_class});
    }
  });
  links.forEach(function(d) {
    d.straight = 1;
    links.forEach(function(d1) {
      if ((d.source == d1.target) && (d1.source == d.target))
        d.straight = 0;
    });
  });
  var width = svg.style("width").replace("px", ""),
      height = svg.style("height").replace("px", "");
  var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .linkDistance(50)
      .charge(-300)
      .on("tick", sg_tick)
      .start();
  // Per-type markers, as they don't inherit styles.
  svg.append("defs").selectAll("marker")
      .data(["standard", "standard highlighted"])
    .enter().append("marker")
      .attr("id", function(d) { return d; })
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("path")
      .attr("d", "M0,-5L10,0L0,5");
  // add the links and their arrows
  var sg_path = svg.append("g").selectAll("path")
      .data(force.links())
    .enter().append("path")
      .attr("class", function(d) { return "link " + d.type; })
      .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });
  // add the nodes
  var sg_node = svg.append("g").selectAll("circle")
      .data(force.nodes())
    .enter().append("circle")
      .attr("r", 6)
      .attr("class", function(d) { return "sg " + d.type; })
      .call(force.drag);
  // add the text
  var sg_text = svg.append("g").selectAll("text")
      .data(force.nodes())
    .enter().append("text")
      .attr("x", 8)
      .attr("y", ".31em")
      .text(function(d) { return d.name; });
  // Use elliptical arc path segments to doubly-encode directionality.
  function sg_tick() {
    sg_path.attr("d", linkArc);
    sg_node.attr("transform", transform);
    sg_text.attr("transform", transform);
  }
  function linkArc(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = (d.straight == 0)?Math.sqrt(dx * dx + dy * dy):0;
    return "M" + d.source.x + "," + d.source.y +
        "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  }
  function transform(d) {
    // Keep within bounds of svg
    var buffer = 7;
    x = Math.max(buffer, Math.min(width-buffer, d.x))
    y = Math.max(buffer, Math.min(height-buffer, d.y))
    return "translate(" + x + "," + y + ")";
  }
}
function visualizeit(item){
  // FIRST PANEL
  // Add title
  //d3.select("#image-title")
  //  .append("h4")
  //  .attr("class","removable")
  //  .text("Image: " + item.image_id);
  // Add image
  d3.select("#caption-img").attr("src", "https://mscoco.org/images/"+item.image_id);
  // reference captions
  item.reference_captions.forEach(function(caption) {
    p = d3.select("#ref-panel").append("p").attr("class","removable").text("\"" + caption + "\"");
  })
  // SECOND PANEL
  // reference sg
  var svg_ref = d3.select("#reference")
    .append("svg")
    .attr("class","removable")
    .attr("width", "100%")
    .attr("height", 350);
  renderSceneGraph(svg_ref, item.ref_tuples);
  // THIRD PANEL
  // candidate caption
  d3.select("#candidate-caption").text("\"" + item.test_caption[0] + "\"");
  // candidate scene graph
  var svg_ref = d3.select("#candidate")
    .append("svg")
    .attr("class","removable")
    .attr("width", "100%")
    .attr("height", 300);
  renderSceneGraph(svg_ref, item.test_tuples);
  // candidate scores
  d3.select("#candidate-scores").text("SPICE F-Score: " + item.scores.All.f + ", Pr: " + item.scores.All.pr + ", Re: " + item.scores.All.re);
}
item_index = 0;
d3.json("/images/coco_examples.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
  step(0);
});

function get_index(base_index, distance){
  base_index += distance;
  if (base_index < 0){
    base_index += data.length;
  }
  base_index %= data.length;
  return base_index;
}

function step(distance){
  d3.selectAll(".removable").remove()
  item_index = get_index(item_index, distance);
  visualizeit(data[item_index]);
  // Preload next few images
  preload_count = 5
  for (i = -preload_count; i <= preload_count; i++) {
    if (i==0) continue;
    var next_index = get_index(item_index, i);
    var img = new Image();
    img.src = "https://mscoco.org/images/"+data[next_index].image_id;
  }
};
