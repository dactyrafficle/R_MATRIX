
// can define a default array, or element by element

/* either you need

  obj.arr
  obj.n_rows, obj.n_cols
  
*/

function R_MATRIX(obj) {
  
  /*
  
  obj = {
    'arr':
  }
  
  */

  if (obj.hasOwnProperty('arr')) {
    this.arr = obj.arr;
  }

  // i want to replace m with n_rows, and n with n_cols
  
  this.m = (obj.m || null);
  this.n_rows = (obj.m || null);
  if (obj.hasOwnProperty('n_rows')) {
    this.n_rows = obj.n_rows;
  }
  
  this.n = (obj.n || null);
  this.n_cols = (obj.n || null);
  
  this.a = (obj.a || null);
  
  // FOR USE IN SELF INVOKING METHODS
  let m = this.m; // number of rows
  let n_rows = this.m;
  
  let n = this.n; // number of columns
  let n_cols = this.n;
  
  let a = this.a; // 
  

  
  if (!obj.arr) {
  
  // POPULATE THE ARRAY
  this.arr = (function() {  
    let arr = [];
    for (let y = 0; y < n_rows; y++) {
      arr.push(new Array());
      for (let x = 0; x < n_cols; x++) {
        let num = y*n_cols + x + 1;
        if (a === null) {
          arr[y].push(DEC2EXCEL(num));
        } else {
          arr[y].push(a + '<sub>' + (y+1) + (x+1) + '</sub>' );
        }
      }
    }
    return arr;
  })();
  
  } else {
    //console.log('this');
    this.arr = obj.arr.slice(0);
    this.m = this.arr.length;
    this.n = this.arr[0].length;
    m = this.m;
    n = this.n;
  }
  arr = this.arr.slice(0);
  
  // MAKE THE TABLE
  this.table = (function() {
    
    let table = document.createElement('table');
    
    table.style.borderCollapse = 'collapse';
    table.style.fontFamily = 'monospace';
    table.style.fontSize = '1.3em';

    let padding = '0.25vh 0.75vh'; // can change
    let border = '1px solid #f6f6f6';
    let textAlign = "right";
    
    for (let y = 0; y < arr.length; y++) {
      let tr = document.createElement('tr');
      table.appendChild(tr);

      for (let x = 0; x < arr[y].length; x++) {
        let td = document.createElement('td');
        td.innerHTML = arr[y][x];
        td.style.padding = padding;
        td.style.border = border;
        
        
        
        if (x === 0) {
         td.style.borderLeft = '2px solid #777';
        }
        if (x === (arr[y].length-1)) {
         td.style.borderRight = '2px solid #777';
        }
        td.style.textAlign = textAlign;
        tr.appendChild(td);
      }
    }
    
   return table;
  })();


}