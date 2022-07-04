

// start with an array of arrays
// multiply will return a new array of arrays


/*
@done:
 1. let a = new R_MATIRX(obj)
 2. a.getMatrix(obj) // to draw matrix (with highlight)
 3. a.getDet(obj) // to draw determinant
 5. a.getCofactor(i,j) // to return cofactor  @working
 
@working: 
 4. *** a.getExpandedDet() // to draw expanded determinant @working: get signs right
 5. eval determinant if numeric
*/

function DEC2EXCEL(n) {
 let num_arr = DEC2NONZEROBASE(n, 26);
 let str = '';
 num_arr.forEach(function(a) {
   str += String.fromCharCode(a+96);
 });
 return str;
}
function DEC2NONZEROBASE(n,b) {
 let arr = [];
 arr.push((n-1) % b + 1);
 if (Math.floor((n-1)/b) > 0) {
  arr = DEC2NONZEROBASE(Math.floor((n-1)/b), b).concat(arr)
 }
 return arr;
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

// 
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

// return_dot_product_as_number(a.return_row_as_arr(1), a.return_col_as_arr(1));

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

 let a = new R_MATRIX({'arr':output});
 return a.getDet();
 
}





R_MATRIX.prototype.getMatrix = function(obj) {
 let table = this.table.cloneNode(true);
 
 // FORMATTING THE TABLE
 if (obj) {
 
 let rows = table.children;
 for (let y = 0; y < rows.length; y++) {
   let row = rows[y];
   let cells = row.children;
   for (let x = 0; x < cells.length; x++) {
     let cell = cells[x];
    
     if (obj.padding) {cell.style.padding = obj.padding;}
    
     if (obj.highlight) {
       let highlight_color = '#fc08';
       if (obj.highlight.color) {
         highlight_color = obj.highlight.color;
       }
       if (obj.highlight.row) {
         if (y === (obj.highlight.row-1)) {
          cell.style.backgroundColor = highlight_color;
         } 
       }
       if (obj.highlight.col) {
         if (x === (obj.highlight.col-1)) {
          cell.style.backgroundColor = highlight_color;
         } 
       }
       if (obj.highlight.cell) {
         if (y === (obj.highlight.cell[0]-1) && x === (obj.highlight.cell[1]-1)) {
          cell.style.backgroundColor = highlight_color;
         } 
       }
     }
     
   }
 }
 }
 
 // CONTAINER FOR THE TABLE
 return getContainer(table);
}
R_MATRIX.prototype.getDet = function() {
 let table = this.table.cloneNode(true);
 return getContainer(table, 0);;
}  




function getSign(n) {
  if (n === 0) {return '';}
  if (n%2 === 0) {return '+';}
  return '-';
}

R_MATRIX.prototype.evalDet = function() {
 
 return 0;
}



R_MATRIX.prototype.printDet = function(obj) {

 if (this.arr.length === 2) {
  return  "<span style='color: #fc0; font-family: monospace;'>" + this.arr[0][0] + "&sdot;" + this.arr[1][1] + '-' + this.arr[0][1] + "&sdot;" + this.arr[1][0] + "</span>";
 } else {
 
  let str = '';
  let color = null;
  if (this.arr.length === 3) {color = '#3366cc';}
  for (let i = 0; i < this.arr[0].length; i++) {
  
   //console.log(a[0][i]); // letter
   
   let b = this.arr.slice(0);
   //console.log('original')
   //console.log(b); // copy of original
   
   let c = b.slice(1); // get rid of first row
   //console.log('remove first row');
   //console.log(c);
   
   let d = [];
   for (let j = 0; j < c.length; j++){
     //console.log(c[j]);
     let d1 = c[j].slice(0,i);
     let d2 = c[j].slice(i+1);
     d.push(d1.concat(d2));
     //d.push(d1);
   }
   //console.log(d);
   str += "<span style='font-family: monospace; color:" + color + "';>" + this.arr[0][i] + '(' + d.printDet() + ')' + "</span>";
   
   if (i !== this.arr[0].length-1) {
    str += ' + '
   }
   
  }
  return str;
 }
}


function getContainer(table, matrixBorder = 1) {

 let div = document.createElement('div');
 div.style.display = 'inline-block';
 div.style.verticalAlign = 'middle';
 div.style.margin = '5px';
 div.style.padding = '0';
  
 let t0 = document.createElement('table');
 t0.style.borderCollapse = 'collapse';
 t0.style.padding = 0;
 t0.style.margin = 0;
 div.appendChild(t0);
 
 for (let i = 0; i < 3; i++) {
   
   let r0 = document.createElement('tr');
   r0.style.padding = 0;
   r0.style.margin = 0;
   t0.appendChild(r0);
   
   let c0 = document.createElement('td');
   c0.style.padding = 0;
   c0.style.margin = 0;
   r0.appendChild(c0);
   
   let t1 = document.createElement('table');
   t1.style.borderCollapse = 'collapse';
   t1.style.padding = 0;
   t1.style.margin = 0;
   t1.style.width = '100%';
   c0.appendChild(t1);
   
   let r1 = document.createElement('tr');
   r1.style.padding = 0;
   r1.style.margin = 0;
   r1.style.width = '100%';
   t1.appendChild(r1);
   
   if (i === 0 || i === 2) {
     for (let j = 0; j < 4; j++) {
       let c1 = document.createElement('td');
       c1.style.padding = 0;
       c1.style.margin = 0;

       if (j === 0 || j === 3) {
         c1.style.width = '5px';
         if (i === 0 && matrixBorder) {
           c1.style.borderBottom = '2px solid #777';
         }
         if (i === 2 && matrixBorder) {
           c1.style.borderTop = '2px solid #777';
         }
       }
       r1.appendChild(c1);  
     }
     
   } else {
     let c1 = document.createElement('td');
     c1.style.padding = 0;
     c1.style.margin = 0;
     c1.appendChild(table);
     r1.appendChild(c1);
   }  
 }
 return div;
}