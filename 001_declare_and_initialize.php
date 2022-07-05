
<!-- opening L0 -->
<div class='section border margin padding'>

  <h4> declare and initialize </h4>

  <pre class='code border padding'>let a = new R_MATRIX({'n_rows':4,'n_cols':4});</pre>
  <pre class='code border padding'>a.getMatrix()</pre>
  
  <pre class='code border padding'>let b = new R_MATRIX({'m':2,'n':2,'a':'a'});</pre>
  <pre class='code border padding'>b.getMatrix()</pre>

  <pre class='code border padding'>let f = new R_MATRIX({'n_rows':4,'n_cols':4,'generated_elements':'f'});</pre>
  <pre class='code border padding'>let h = new R_MATRIX({'n_rows':4,'n_cols':4,'hardcoded_elements':[['y','-c'],['-by','c']]});</pre>

  <div id='container_001_declare_and_initialize'></div>

<script>

let a, b, f, h;

window.addEventListener('load', function() {

  a = new R_MATRIX({'n_rows':4,'n_cols':4});
  container_001_declare_and_initialize.appendChild(a.getMatrix());
    
  b = new R_MATRIX({'m':2,'n':2,'a':'a'});
  container_001_declare_and_initialize.appendChild(b.getMatrix());
  
  f = new R_MATRIX({'n_rows':4,'n_cols':4,'generated_elements':'f'});
  container_001_declare_and_initialize.appendChild(f.getMatrix());
  
  h = new R_MATRIX({'n_rows':4,'n_cols':4,'hardcoded_elements':[['y','-c'],['-by','c']]});
  container_001_declare_and_initialize.appendChild(h.getMatrix());
  
}); // closing window.onload

</script>

</div> <!-- closing L0 -->