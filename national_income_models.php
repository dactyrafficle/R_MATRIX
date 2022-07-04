
<!-- opening L0 -->
<div class='section border margin padding'>
  <h4> national income models </h4>

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

<!-- opening L0 -->
<div class='section border margin padding'>

<h4> national income model 2 </h4>
  
<ul>
  <li><p> Y = C + i + g </p>
  <li><p> C = c<sub>0</sub> + c(Y-T) </p>
  <li><p> T = tY </p>
</ul>

<p> in this case, we havent [make it parametric] so we have 3 endo variables </p>

<div id='nation_income_model_2'></div>

<p> det(A) = -1 + c - ct </p>

<script>
window.addEventListener('load', function() {
  
  let Ax = new R_MATRIX({'arr':[
    ["Y", "C", "0"],
    ["-cY", "-C", "cT"],
    ["-tY","0","T"]
  ]});
  let A = new R_MATRIX({'arr':[
    ["1", "1", "0"],
    ["-c", "-1", "c"],
    ["-t","0","1"]
  ]});
  let x = new R_MATRIX({'arr':[
    ["Y"],
    ["C"],
    ["T"]
  ]});
  let d = new R_MATRIX({'arr':[
    ["i+g"],
    ["c<sub>0</sub>"],
    ["0"]
  ]});
  nation_income_model_2.innerHTML += "<pre class='blue'>Ax.getMatrix()</pre>";
  nation_income_model_2.innerHTML += "<pre class='blue'>d.getMatrix()</pre>";
  nation_income_model_2.appendChild(Ax.getMatrix());
  nation_income_model_2.appendChild(d.getMatrix());

  nation_income_model_2.appendChild(A.getMatrix());
  nation_income_model_2.appendChild(x.getMatrix());
  nation_income_model_2.appendChild(d.getMatrix());
  
  nation_income_model_2.appendChild(A.getExpandedDet({'row':2,'col':1}));
  
});


</script>



</div> <!-- closing L0 -->