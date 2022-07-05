<?php
  include "./includes.php";
?>

<body>

  <?php include "./001_declare_and_initialize.php"; ?>
  <?php include "./002_highlighting.php"; ?>
  
  <div id='ax'></div>

  <?php include "./national_income_model_1.php"; ?>
  <?php include "./national_income_model_2.php"; ?>

</body>

<script>

let ax = document.getElementById('ax');




ax.innerHTML += "<h4>b.getDet()</h4>";
ax.innerHTML += "<pre class='blue'>a.getDet()</pre>";
ax.innerHTML += "<pre class='blue'>b.getDet()</pre>";
ax.appendChild(a.getDet());
ax.appendChild(b.getDet());

ax.innerHTML += "<h4>a.getCofactor(i,j)</h4>";
ax.innerHTML += "<pre class='blue'>a.getCofactor(2,1)</pre>";
ax.appendChild(a.getCofactor(2,1));

ax.innerHTML += "<h4>a.getExpandedDet(obj)</h4>";

ax.innerHTML += "<pre class='blue'>a.getExpandedDet({'row':2})</pre>";
ax.appendChild(a.getExpandedDet({'row':2}));

ax.innerHTML += "<pre class='blue'>a.getExpandedDet({'col':3})</pre>";
ax.appendChild(a.getExpandedDet({'col':3}));

ax.innerHTML += "<pre class='blue'>a.getExpandedDet() <span class='green'>// default </span></pre>";
ax.appendChild(a.getExpandedDet());

ax.innerHTML += "<pre class='blue'>b.getExpandedDet()</pre>";
ax.appendChild(b.getExpandedDet());

ax.innerHTML += "<pre class='blue'>b.getExpandedDet()</pre>";
ax.appendChild(b.getExpandedDet());

ax.innerHTML += "<pre class='blue'>return_dot_product_as_number(a.return_row_as_arr(1), a.return_col_as_arr(1));</pre>";
let bnbn = return_dot_product_as_number(a.return_row_as_arr(1), a.return_col_as_arr(1));
let p = document.createElement('p');
p.innerHTML = bnbn;
ax.appendChild(p);


let c = new R_MATRIX({'arr':[[1],[2],[3],[4]]});
ax.innerHTML += "<pre class='blue'>c.getMatrix()</pre>";
ax.appendChild(c.getMatrix());


ax.innerHTML += "<pre class='blue'>a.showMultiply(b)</pre>";




</script>
</html>