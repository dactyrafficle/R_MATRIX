
R_MATRIX.prototype.getExpandedDet = function(obj) {
  
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
    
    div.appendChild(this.getDet());
    
    let span = document.createElement('span');
    span.innerHTML = '= ' + this.arr[0][0] + '&#183;' + this.arr[1][1] + ' - ' + this.arr[1][0] + '&#183;' + this.arr[0][1];
    span.style.fontFamily = this.table.style.fontFamily;
    span.style.fontSize = this.table.style.fontSize;
    div.appendChild(span);
    return div;
  }
  
  // ALL OTHER CASES
  div.appendChild(this.getDet());
  let span_equal = document.createElement('span');
  span_equal.innerHTML = "="
  span_equal.style.margin = "5px";
  div.appendChild(span_equal);
  
  for (let x = 0; x < this.n; x++) {

    if (x !== 0) {
      let s2 = document.createElement('span');
      s2.innerHTML = getSign(x);
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
    
    div.appendChild(this.getCofactor(1, x+1));

  }
  return div;
 
};