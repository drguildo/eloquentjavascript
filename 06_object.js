// @ts-check

// A vector type

function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = other => new Vector(this.x + other.x, this.y + other.y);
Vector.prototype.minus = other => new Vector(this.x - other.x, this.y - other.y);
Object.defineProperty(Vector.prototype, "length", {
  get: () => Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
});


let a = new Vector(2, 4);
let b = new Vector(1, 3);

console.log(a, b);

// Another cell

function rowHeights(rows) {
  return rows.map(function (row) {
    return row.reduce(function (max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidths(rows) {
  return rows[0].map(function (_, i) {
    return rows.reduce(function (max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function (block) {
      return block[lineNo];
    }).join(" ");
  }

  function drawRow(row, rowNum) {
    var blocks = row.map(function (cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function (_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }

  return rows.map(drawRow).join("\n");
}

function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

function TextCell(text) {
  this.text = text.split("\n");
}
TextCell.prototype.minWidth = function () {
  return this.text.reduce(function (width, line) {
    return Math.max(width, line.length);
  }, 0);
};
TextCell.prototype.minHeight = function () {
  return this.text.length;
};
TextCell.prototype.draw = function (width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

function UnderlinedCell(inner) {
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function () {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function () {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function (width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]);
};

function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function (name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function (row) {
    return keys.map(function (name) {
      return new TextCell(String(row[name]));
    });
  });
  return [headers].concat(body);
}

// @ts-ignore
let MOUNTAINS = require("./mountains.js");
console.log(drawTable(dataTable(MOUNTAINS)));

function StretchCell(inner, width, height) {
  this.inner = inner;
  this.width = width;
  this.height = height;
}
StretchCell.prototype.minWidth = function () {
  return Math.max(this.width, this.inner.minWidth());
};
StretchCell.prototype.minHeight = function () {
  return Math.max(this.height, this.inner.minHeight());
};
StretchCell.prototype.draw = function (width, height) {
  return this.inner.draw(Math.max(this.minWidth(), width), Math.max(
    this.minHeight(), height));
};

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]

// Sequence interface

function ArraySeq(arr) {
  this.arr = arr;
  this.cur = 0;
}
ArraySeq.prototype.hasNext = function () {
  return this.cur < this.arr.length;
};
ArraySeq.prototype.next = function () {
  if (this.hasNext()) {
    return this.arr[this.cur++];
  }
  return undefined;
};

function RangeSeq(from, to) {
  this.from = from;
  this.to = to;
  this.cur = from;
}
RangeSeq.prototype.hasNext = function () {
  return this.cur < this.to;
};
RangeSeq.prototype.next = function () {
  if (this.hasNext()) {
    return this.cur++;
  }
  return undefined;
};

function logFive(seq) {
  let i = 0;
  while (i < 5 && seq.hasNext()) {
    console.log(seq.next());
    i++;
  }
}

logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104
