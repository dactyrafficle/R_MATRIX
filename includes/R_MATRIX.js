/* LAST UPDATED : 2022-08-10-0507 EDT */

// these are functions for numerical evaluation
let rafficot = {};

// methods with no dependencies will have filenames starting with 1000

// those with dependencies will 2000+

rafficot.create_matrix = function(n_rows, n_cols) {

  let output_matrix = [];
  
  for (let y = 0; y < n_rows; y++) {
  
    output_matrix.push(new Array());
    
    for (let x = 0; x < n_cols; x++) {
      output_matrix[y].push(0);
    }
  }
  
  return output_matrix;
};



rafficot.get_sub_matrix = function(a, y, x) {

  // clone the matrix first
  let m = [];
  for (let i = 0; i < a.length; i++) {
    m.push([]);
    for (let j = 0; j < a[i].length; j++) {
      m[i].push(a[i][j]);
    }
  }

  m.splice(y, 1); // deletes the first row
  
  for (let i = 0; i < m.length; i++) {
    m[i].splice(x, 1);
  }
  
  return m;
};
rafficot.get_transpose = function(matrix) {

  let n_rows = matrix.length;
  let n_cols = matrix[0].length;
  
  let output_matrix = this.create_matrix(n_cols, n_rows);
  
  for (let y = 0; y < n_cols; y++) {
    for (let x = 0; x < n_rows; x++) {
    
      output_matrix[y][x] = matrix[x][y];
    
    }
  }

  return output_matrix;

};

  rafficot.get_determinant = function(a) {

    // exit condition 1 
    if (a.length === 1) {
      return a[0][0];
    }
  
    // exit condition 2 
    if (a.length === 2) {
      return (a[0][0] * a[1][1] - a[1][0] * a[0][1]);
    }
  
    // expansion using row 1 
    let y = 0;
    let det = 0;
    for (let x = 0; x < a.length; x++) {
      let m = this.get_sub_matrix(a, y, x);  // another function I wrote, so possibly we can expand along any row-column combo 
      det += (-1)**((y+1)+(x+1)) * a[0][x] * this.get_determinant(m); // is recursive 
    }
    
    return det;
  };

rafficot.get_product = function(matrix_a, matrix_b) {

  // i maybe should check that the number of columns from matrix_a matches the number of rows from matrix_b ***
  
  // the number of rows comes from matrix_a
  let n_rows = matrix_a.length;
  
  // the number of columns comes from matrix_b
  let n_cols = matrix_b[0].length;
  
  // the output matrix
  let output_matrix = this.create_matrix(n_rows, n_cols);
  
  let n = matrix_a[0].length; // ***


  // loop over the rows of matrix_a
  for (let y = 0; y < n_rows; y++) {
    
    for (x = 0; x < n_cols; x++) {
      
      
      output_matrix[y][x] = 0;
      // let a = 0;
      
      // element (y,x) of the output_matrix is the dot product of row-y of matrix_a, and column-x of matrix_b
      // thats why we needed this ***
      for (let z = 0; z < n; z++) {
      
        // a += matrix_a[y][k] * matrix_b[k][j];
        output_matrix[y][x] += matrix_a[y][z] * matrix_b[z][x];
      }
      // output_matrix[y][x] = a;
      
    }
    
    
  
  }

  return output_matrix;

};

// RETURNS A MODIFIED COPY OF THE ORIGINAL
rafficot.get_cofactor_matrix = function(matrix) {

  let output_matrix = [];
  
  for (let y = 0; y < matrix.length; y++) {
    
    output_matrix.push([]);
    for (let x = 0; x < matrix[y].length; x++) {
    
      let sub_matrix = this.get_sub_matrix(matrix, y, x);
      let det = this.get_determinant(sub_matrix);
      output_matrix[y].push((-1)**((y+1)+(x+1)) * det);
      
    }
  }

  return output_matrix;

};
rafficot.get_adjugate = function(matrix) {

  let cofactor_matrix = this.get_cofactor_matrix(matrix);
  
  let adjugate_matrix = this.get_transpose(cofactor_matrix);
  
  return adjugate_matrix;

};
rafficot.get_inverse = function(matrix) {

  let adjugate_matrix = this.get_adjugate(matrix);

  let determinant = this.get_determinant(matrix);

  let n = matrix.length;  
  let matrix_inverse = this.create_matrix(n, n);
  
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      matrix_inverse[y][x] = (1/determinant) * adjugate_matrix[y][x];
    }
  }
  
  return matrix_inverse;
  
};


/*

obj = {
  'border_type':border_type,
  'decimal_places':null
}

*/
R_MATRIX.prototype.getMatrix = function(obj) {
  
  // MAKE THE TABLE
  let table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  table.style.border = '0px solid transparent';
  table.style.margin = 0;
  table.style.padding = 0;
  
  table.style.fontFamily = 'monospace';

  
  // EACH CELL. DEFAULT SPECS
  let border = '1px solid #f6f6f6';
  let padding = '0.5em 0.75em'; // can change
  let textAlign = "right";


  // FOR EACH ROW
  for (let y = 0; y < this.n_rows; y++) {

    let tr = document.createElement('tr');
    table.appendChild(tr);

      // FOR EACH COLUMN
      for (let x = 0; x < this.n_cols; x++) {
        
        let td = document.createElement('td');
        td.style.padding = padding;
        td.style.border = border;
        td.style.textAlign = textAlign;
        tr.appendChild(td);
        
        if (this.arr[y][x].constructor.name === "R_MATRIX") {
          td.appendChild(this.arr[y][x].getMatrix(obj));
        }
        if (this.arr[y][x].constructor.name !== "R_MATRIX") {
          
          let val = this.arr[y][x];
          
          // IF IT IS A NUMBER
          if (val + 0 === val) {
            
            // IF WE HAVE A DECIMAL SPECIFICATION
            if (obj.hasOwnProperty('decimal_places')) {
              
              let decimal_places = obj.decimal_places;
              
              // IF THE SPECIFICATION IS AN INTEGER
              if (decimal_places%1 === 0 && decimal_places >= 0) {
                
                let k = 10**decimal_places;
                val = (Math.round(val * k) / k).toFixed(decimal_places);
                
              }
              
              
            }
            
          }
          
          td.innerHTML = val;
          
          
          
        }  
    
    } // closing x-loop
      
  } // closing y-loop
  
  return this.addBorders({
    'border_type':obj.border_type,
    'contents':table
  });

};



// obj = {'border_type':border_type,'contents':contents}
R_MATRIX.prototype.addBorders = function(obj) {

  // THIS FUNCTION RETURNS A TABLE WITH 3 ROWS, WITH 5-3-5 CELLS RESPECTIVELY
  // THE TOP AND BOTTOM ROWS HAVE 5 CELLS BECAUSE CELLS 1 AND 3 ARE THE OVERHANG FOR THE BORDERED MATRIX
  // CELL 1-1 HOLDS THE CONTENTS OF THE MATRIX
  
  let border_thickness = 2; // in px
  let border_overhang = 5; // in px

  // THIS PART, THE CELLS OBJECT, IS JUST FOR EASE OF REFERENCE
  let cells = [];
  for (let y = 0; y < 3; y++) {
    cells.push([]);
    let n_cols = (y == 1) ? (3) : (5);
    for (let x = 0; x < n_cols; x++) {
      let td = document.createElement('td');
      td.style.border = 'none';
      td.style.margin = 0;
      td.style.padding = 0;
      cells[y].push(td);
    }
  }
  cells[1][1].colSpan = 3;
  
  // BORDER THICKNESS
  cells[0][0].style.height = border_thickness + 'px';
  cells[1][0].style.width = border_thickness + 'px';
  cells[1][2].style.width = border_thickness + 'px';
  cells[2][0].style.height = border_thickness + 'px';
  
  // THE OVERHANG
  cells[0][1].style.width = border_overhang + 'px';
  cells[0][3].style.width = border_overhang + 'px';

  // APPLYING COLOR THE THE BORDERS
  cells[0][0].style.backgroundColor = '#999';
  cells[0][4].style.backgroundColor = '#999';
  
  if (obj.border_type === 'B') {
    cells[0][1].style.backgroundColor = '#999';
    cells[0][3].style.backgroundColor = '#999';
    cells[2][1].style.backgroundColor = '#999';
    cells[2][3].style.backgroundColor = '#999';
  }
  
  cells[1][0].style.backgroundColor = '#999';
  cells[1][2].style.backgroundColor = '#999';
  cells[2][0].style.backgroundColor = '#999';
  cells[2][4].style.backgroundColor = '#999';

  // MAKE THE ACTUAL TABLE
  let table = document.createElement('table');
  table.style.borderCollapse = 'collapse';  // most important, this is
  table.style.border = 'none';
  table.style.margin = 0;
  table.style.padding = 0;

  for (let y = 0; y < cells.length; y++) {
    let tr = document.createElement('tr');
    tr.style.border = 'none';
    tr.style.margin = 0;
    tr.style.padding = 0;
    table.appendChild(tr);
    
    for (let x = 0; x < cells[y].length; x++) {

      // APPLY THE CONTENTS
      if (x === 1 && y === 1) {
        cells[y][x].appendChild(obj.contents);
      }
      tr.appendChild(cells[y][x]);
    }
  }
  
  return table;

};


R_MATRIX.prototype.getBMatrix = function(obj_) {
  
  let obj = Object.assign({},obj_);   // COPY THE INPUT OBJECT
  obj.border_type = 'B';              // ADD THE BORDER PROPERTY
  let m = this.getMatrix(obj);
  
  let container = document.createElement('div');
  container.style.display = 'inline-block';
  container.appendChild(m);
  
  return container;
};


R_MATRIX.prototype.getVMatrix = function() {
  
  let m = this.getMatrix({'border_type':'V'});
  
  let container = document.createElement('div');
  container.style.display = 'inline-block';
  container.appendChild(m);
  
  return container;
};

// can define a default array, or element by element

function R_MATRIX(obj) {
  
  /*
    obj = {
      'n_rows':m,
      'n_cols':n,
      'generated_elements':null,  // generated elements
      'hardcoded_elements':null   // hardcoded elements
    }
  */
  
  this.n_rows = (obj.n_rows || null);
  this.m = (obj.m || null);
  this.n_cols = (obj.n_cols || null);
  this.n = (obj.n || null);
  this.generated_elements = (obj.generated_elements || null);
  this.a = (obj.a || null);
  this.hardcoded_elements = (obj.hardcoded_elements || null);
  this.arr = (obj.arr || null);

  // VIA HARDCODED ELEMENTS
  if (obj.hasOwnProperty('hardcoded_elements') || obj.hasOwnProperty('arr')) {
    this.POPULATE_MATRIX_VIA_HARDCODED_ELEMENTS();
  };
  
  // VIA GENERATED ELEMENTS
  if (!obj.hasOwnProperty('hardcoded_elements') && !obj.hasOwnProperty('arr')) {
    this.POPULATE_MATRIX_WITH_GENERATED_ELEMENTS();
  };
  
  this.CREATE_BASE_TABLE();

};

R_MATRIX.prototype.POPULATE_MATRIX_VIA_HARDCODED_ELEMENTS = function() {
  
  // HARDCODED ELEMENTS
  if (this.hardcoded_elements !== null) {
    this.hardcoded_elements = this.hardcoded_elements;
    this.arr = this.hardcoded_elements;
  }
  if (this.arr !== null) {
    this.hardcoded_elements = this.arr;
    this.arr = this.arr;
  }

  // THE DIMENSIONS
  this.n_rows = this.arr.length;
  this.m = this.arr.length;
  this.n_cols = this.arr[0].length;
  this.n = this.arr[0].length;
  
};

R_MATRIX.prototype.POPULATE_MATRIX_WITH_GENERATED_ELEMENTS = function() {

  // THE ROWS
  if (this.n_rows !== null) {
    this.n_rows = this.n_rows;
    this.m = this.n_rows
  }
  if (this.m !== null) {
    this.n_rows = this.m;
    this.m = this.m
  }
  
  // THE COLUMNS
  if (this.n_cols !== null) {
    this.n_cols = this.n_cols;
    this.n = this.n_cols;
  }
  if (this.n !== null) {
    this.n_cols = this.n;
    this.n = this.n;
  }
  
  // THE ELEMENTS
  if (this.generated_elements !== null) {
    this.generated_elements = this.generated_elements;
    this.a = this.generated_elements;
  }
  if (this.a !== null) {
    this.generated_elements = this.a;
    this.a = this.a;
  }

  // THE ARRAY ITSELF
  this.arr = [];
  for (let y = 0; y < this.n_rows; y++) {
    this.arr.push(new Array());
    for (let x = 0; x < this.n_cols; x++) {
      let num = y * this.n_cols + x + 1;
      if (this.a === null) {
        this.arr[y].push(DEC2EXCEL(num));
      } else {
        this.arr[y].push(this.a + '<sub>' + (y + 1) + (x + 1) + '</sub>' );
      }
    };
  };
};




R_MATRIX.prototype.CREATE_BASE_TABLE = function() {
  
  // MAKE THE TABLE
  this.table = document.createElement('table');

  this.table.style.borderCollapse = 'collapse';
  this.table.style.fontFamily = 'monospace';
  this.table.style.fontSize = '1.3em';

  let padding = '0.25vh 0.75vh'; // can change
  let border = '1px solid #f6f6f6';
  let textAlign = "right";
    
  for (let y = 0; y < this.arr.length; y++) {
    
    let tr = document.createElement('tr');
    this.table.appendChild(tr);

      for (let x = 0; x < this.arr[y].length; x++) {
        
        let td = document.createElement('td');
        td.innerHTML = this.arr[y][x];
        td.style.padding = padding;
        td.style.border = border;
        td.style.textAlign = textAlign;
        
        
        if (x === 0) {
          td.style.borderLeft = '2px solid #777';
        }
        if (x === (this.arr[y].length-1)) {
          td.style.borderRight = '2px solid #777';
        }
        
        tr.appendChild(td);
    
    } // closing x-loop
      
  } // closing y-loop

};

// returns a table
R_MATRIX.prototype.RETURN_BASE_TABLE = function() {
  return this.table;
};





function DEC2EXCEL(n) {
 let num_arr = DEC2NONZEROBASE(n, 26);
 let str = '';
 num_arr.forEach(function(a) {
   str += String.fromCharCode(a+96);
 });
 return str;
};

function DEC2NONZEROBASE(n,b) {
 let arr = [];
 arr.push((n-1) % b + 1);
 if (Math.floor((n-1)/b) > 0) {
  arr = DEC2NONZEROBASE(Math.floor((n-1)/b), b).concat(arr)
 }
 return arr;
};

/*
obj = {
 'highlight':{
   'row':0,
   'col':0,
   'cell':0,
   'color':[hex]
 } 
}
*/
// returns an R_MATRIX object
R_MATRIX.prototype.getCofactor = function(y, x) {
  let arr = this.arr.slice(0);
  
  let output = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === (y-1)) {
      // skip
    } else {
      output.push(new Array());
      let j = (x-1);
      output[output.length-1] = arr[i].slice(0, j).concat(arr[i].slice(j+1))
    }
  }

 let a = new R_MATRIX({'hardcoded_elements':output});
 
 return a;
 
}

R_MATRIX.prototype.getCofactorMatrix = function() {
  
  // we need to make an array with all the cofactors
  let arr = [];
  for (let y = 0; y < this.n_rows; y++) {
    arr.push(new Array());
    for (let x = 0; x < this.n_cols; x++) {
      arr[y][x] = this.getCofactor(y+1,x+1);
    }
  }
  
  let r = new R_MATRIX({'hardcoded_elements':arr});
  console.log(r);
  return r;
};

R_MATRIX.prototype.getExpandedDet = function(obj) {

  let container = document.createElement('div');
  


  if (this.m !== this.n) {
    let div = document.createElement('div');
    div.innerHTML = 'it has to be a square';
    return div;
  }

  let div = document.createElement('div');
  // div.style.backgroundColor = '#fc08';
  div.style.fontFamily = 'calibri';
  
  // IF ITS JUST A 1X1 MATRIX
  if (this.m === 1 && this.n == 1) {
    div.innerHTML = this.arr[0][0];
    return div;
  }

  // IF ITS 2X2
  if (this.m === 2 && this.n === 2) {
    
    div.appendChild(this.getVMatrix());
    
    let span = document.createElement('span');
    span.innerHTML = '= ' + this.arr[0][0] + '&#183;' + this.arr[1][1] + ' - ' + this.arr[1][0] + '&#183;' + this.arr[0][1];
    span.style.fontFamily = this.table.style.fontFamily;
    span.style.fontSize = this.table.style.fontSize;
    div.appendChild(span);
    return div;
  }
  
  // ALL OTHER CASES
  div.appendChild(this.getVMatrix());
  let span_equal = document.createElement('span');
  span_equal.innerHTML = "="
  span_equal.style.margin = "5px";
  div.appendChild(span_equal);
  
  
  let y = 0;
  
  for (let x = 0; x < this.n; x++) {

    if (x !== 0) {
      let s2 = document.createElement('span');
      s2.innerHTML = (-1)**((y+1)+(x+1)); // get sign
      s2.style.margin = "5px";
      div.appendChild(s2);
    };
    
    let s3 = document.createElement('span');
    s3.innerHTML = this.arr[0][x];
    s3.style.margin = "5px";
    div.appendChild(s3);

    let s4 = document.createElement('span');
    s4.innerHTML = "&middot;";
    s4.style.margin = "0";
    div.appendChild(s4);
    
    div.appendChild(this.getCofactor(1, x+1).getVMatrix());

  }
  return div;
 
};

// egg

/*
obj = {
 'highlight':{
   'row':0,
   'col':0,
   'cell':0,
   'color':[hex]
 } 
}
*/
// returns an R_MATRIX object
R_MATRIX.prototype.getTranspose = function() {
  
  // copy the array
  let arr = this.arr.slice(0);
  
  let output = [];
  
  for (let i = 0; i < this.n_cols; i++) {
 
    output.push(new Array());
    for (let j = 0; j < this.n_rows; j++) {
      
        output[i][j] = arr[j][i];
    }
  }

 let a = new R_MATRIX({'hardcoded_elements':output});
 
 return a;
 
}

R_MATRIX.prototype.getArr = function() {
 return this.arr.slice(0);
};

// returns an array
R_MATRIX.prototype.return_row_as_arr = function(n) {
 return this.arr.slice(n,n+1)[0];
};
// returns an array
R_MATRIX.prototype.return_col_as_arr = function(m) {
 let arr = [];
 for (let y = 0; y < this.n_rows; y++) {
   arr.push(this.arr[y][m]);
 }
 return arr;
};

function return_dot_product_as_number(arr_y, arr_x) {

  // the must have the same length
  let n = arr_x.length;
  if (n !== arr_y.length) {
    console.log('you cant dot product 2 vectors if they dont have the same length');
    return;
  }
  
  let str = "<p>";
  
  for (let i = 0; i < n; i++) {
    str += arr_y[i] + " &middot; " + arr_x[i];
    
    if (i !== (n-1)) {
      str += " + ";
    }
    
  }
  
  str += "</p>"
  
  return str;
};

