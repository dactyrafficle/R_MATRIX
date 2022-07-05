
<!-- opening L0 -->
<div class='section border margin padding'>

  <h4> national income model 2 </h4>
    
  <ul>
    <li><p> no interest rate (or fixed interest, rendering I constant) </p>
    <li><p> taxes </p>
    <li><p> not parametric, so 3 endogenous variables </p>
  </ul>
    <p style='border-bottom: 1px solid #ddd'></p>
  <ul>
    <li><p> Y = C + i + g </p>
    <li><p> C = c<sub>0</sub> + c(Y-T) </p>
    <li><p> T = tY </p>
  </ul>

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
  nation_income_model_2.innerHTML += "<pre class='code border padding'>Ax.getMatrix()</pre>";
  nation_income_model_2.innerHTML += "<pre class='code border padding'>d.getMatrix()</pre>";
  nation_income_model_2.appendChild(Ax.getMatrix());
  nation_income_model_2.appendChild(d.getMatrix());

  nation_income_model_2.appendChild(A.getMatrix());
  nation_income_model_2.appendChild(x.getMatrix());
  nation_income_model_2.appendChild(d.getMatrix());
  
  nation_income_model_2.appendChild(A.getExpandedDet({'row':2,'col':1}));
  
});


</script>

</div> <!-- closing L0 -->