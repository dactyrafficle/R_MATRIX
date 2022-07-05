
<!-- opening L0 -->
<div class='section border margin padding'>
  <h4> national income model 1 </h4>

  <ul>
    <li><p> no interest rate (or fixed interest, rendering I constant) </p>
    <li><p> no taxes </p>
    <li><p> not parametric </p>
  </ul>
  <p style='border-bottom: 1px solid #ddd'></p>
  <ul>
    <li><p> y = c + i + g </p>
    <li><p> c = a + by </p>
  </ul>

<p> in this model, there is no interest rate. so i is constant. there is no import export either </p>

<pre class='code border padding'>let g = new R_MATRIX({'arr':[
 ["y", "-c"],
 ["-by", "c"]
]});

g.getMatrix();</pre>

<div id='nation_income_model_1'></div>

<script>
window.addEventListener('load', function() {
  let g = new R_MATRIX({'arr':[
    ["y", "-c"],
    ["-by", "c"]
  ]});
  nation_income_model_1.appendChild(g.getMatrix());
}); // closing window.onload

</script>

</div> <!-- closing L0 -->
