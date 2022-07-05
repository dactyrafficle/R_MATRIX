
// can define a default array, or element by element

/* either you need

  obj.arr
  obj.n_rows, obj.n_cols
  
*/

function R_MATRIX(obj) {
  
  /*
  
  obj = {
    'n_rows':m,
    'n_cols':n,
    'generated_elements':null, // generated elements
    'arr':null // hardcoded elements
  }
  
  */
  
  // IF WE HARDCODE ELEMENTS, THEN THOSE ELEMENTS TAKE PRECEDENCE
  if (obj.hasOwnProperty('arr')) {
    this.arr = obj.arr;
  }
  
  // IF NO HARDCODED ELEMENTS
  
  // THE NUMBER OF ROWS
  
  this.n_rows = 0;
  this.m = 0;
  
  if (obj.hasOwnProperty('n_rows')) {
    this.n_rows = obj.n_rows;
    this.m = obj.n_rows
  }
  if (obj.hasOwnProperty('m')) {
    this.n_rows = obj.m;
    this.m = obj.m
  }

 // THE NUMBER OF COLUMNS
  
  this.n_cols = 0;
  this.n = 0;
  
  if (obj.hasOwnProperty('n_cols')) {
    this.n_cols = obj.n_cols;
    this.n = obj.n_cols;
  }
  if (obj.hasOwnProperty('m')) {
    this.n_cols = obj.n;
    this.n = obj.n;
  }

 // THE GENERATED ELEMENTS
  
  this.generated_elements = null;
  this.a = null;
  
  if (obj.hasOwnProperty('generated_elements')) {
    this.generated_elements = obj.generated_elements;
    this.a = obj.generated_elements;
  }
  if (obj.hasOwnProperty('a')) {
    this.generated_elements = obj.a;
    this.a = obj.a;
  }
  
  // continued...
  
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