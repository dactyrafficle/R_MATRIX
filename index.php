<?php
  include "./includes.php";
?>

<body>

  <ul>
    <li><p> new R_MATRIX({'n_rows':4,'n_cols':4}); </p>
    <li><p> a.RETURN_BASE_TABLE(); </p>
    <li><p> a.getMatrix(); </p>
    <li><p> a.getMatrix({'highlight':{'row':1,'col':2,'cell':[3,4],'color':'#fc08'}}); </p>
    <li><p> a.getDet(); </p>
    <li><p> a.getCofactor(2,1); </p>
    <li><p> a.getExpandedDet(); </p>
    <li><p> a.getExpandedDet({'row':2}); </p>
    <li><p> a.return_row_as_arr(1) </p>
    <li><p> a.return_col_as_arr(1) </p>
    <li><p> return_dot_product_as_number(a.return_row_as_arr(1), a.return_col_as_arr(1)); </p>
    <li><p> multiply! </p>
  </ul>

  <?php include "./001_declare_and_initialize.php"; ?>
  <?php include "./002_highlighting.php"; ?>
  <?php include "./003_the_determinant.php"; ?>
  <?php include "./004_the_cofactors.php"; ?>
  <?php include "./005_the_expanded_determinant.php"; ?>


  <?php include "./1001_national_income_model_1.php"; ?>
  <?php include "./1002_national_income_model_2.php"; ?>

</body>

</html>