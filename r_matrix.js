

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

function R_MATRIX(obj) {
  
  this.m = (obj.m || null);
  this.n = (obj.n || null);
  this.a = (obj.a || null);
  
  // FOR USE IN SELF INVOKING METHODS
  let m = this.m;
  let n = this.n;
  let a = this.a;
  
  if (!obj.arr) {
  
  // POPULATE THE ARRAY
  this.arr = (function() {  
    let arr = [];
    for (let y = 0; y < m; y++) {
      arr.push(new Array());
      for (let x = 0; x < n; x++) {
        let num = y*n + x + 1;
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
    let textAlign = 'center';
    
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

R_MATRIX.prototype.getArr = function() {
 return this.arr.slice(0);
} 

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


R_MATRIX.prototype.getExpandedDet = function(obj) {
  
  
  if (this.m !== this.n) {
    let div = document.createElement('div');
    div.innerHTML = 'it has to be a square';
    return div;
  }

  let div = document.createElement('div');
  div.style.backgroundColor = '#fc08';
  div.style.fontFamily = 'calibri';
    
  if (this.m === 1 && this.n == 1) {
    div.innerHTML = this.arr[0][0];
    return div;
  }

 
  if (this.m === 2 && this.n === 2) {
    div.appendChild(this.getDet());
    let span = document.createElement('span');
    span.innerHTML = '= ' + this.arr[0][0] + '&#183;' + this.arr[1][1] + ' - ' + this.arr[1][0] + '&#183;' + this.arr[0][1];
    span.style.fontFamily = this.table.style.fontFamily;
    span.style.fontSize = this.table.style.fontSize;
    div.appendChild(span);
    return div;
  }
  
  if (obj) {

    if (obj.col) {
      console.log('column');
      div.appendChild(this.getMatrix({'highlight':{'row':null,'col':obj.col,'cell':null,'color':'#fc08'}}));
      for (let y = 0; y < this.m; y++) {
        let span = document.createElement('span');
        span.style.fontFamily = this.table.style.fontFamily;
        span.style.fontSize = this.table.style.fontSize;
        if (y !== 0) {span.innerHTML += getSign(y+obj.col-1)} else {span.innerHTML = '='};
        span.innerHTML += ' ' + this.arr[y][obj.col-1];
        div.appendChild(span);
        div.appendChild(this.getCofactor(y+1, obj.col));
      }
      return div;
    }

    if (obj.row) {
      console.log('row');
      div.appendChild(this.getMatrix({'highlight':{'row':obj.row,'col':null,'cell':null,'color':'#fc08'}}));
      for (let x = 0; x < this.n; x++) {
        let span = document.createElement('span');
        span.style.fontFamily = this.table.style.fontFamily;
        span.style.fontSize = this.table.style.fontSize;
        if (x !== 0) {span.innerHTML = getSign(x+obj.row-1)} else {span.innerHTML = '='};
        span.innerHTML += ' ' + this.arr[obj.row-1][x];
        div.appendChild(span);
        div.appendChild(this.getCofactor(obj.row, x+1));
      }
      return div;
    }
 } else {
   
    console.log('default');
    div.appendChild(this.getMatrix({'highlight':{'row':1,'col':null,'cell':null,'color':'#fc08'}}));
    for (let x = 0; x < this.n; x++) {
        let span = document.createElement('span');
        span.style.fontFamily = this.table.style.fontFamily;
        span.style.fontSize = this.table.style.fontSize;
        if (x !== 0) {span.innerHTML = getSign(x)} else {span.innerHTML = '='};
        span.innerHTML += ' ' + this.arr[0][x];
        div.appendChild(span);
      div.appendChild(this.getCofactor(1, x+1));
    }
    

    
    return div;
  }
 
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
 div.style.margin = '1vh';
  
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