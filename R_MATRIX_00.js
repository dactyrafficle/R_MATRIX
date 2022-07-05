
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

R_MATRIX.prototype.RETURN_BASE_TABLE = function() {
  return this.table;
};
