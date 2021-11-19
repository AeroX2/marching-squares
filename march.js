const GRID_SIZE = 10;
	
function linearInterp(x0, x1, bx) {
  return  bx + ((1 - x0) / (x1 - x0)) * GRID_SIZE;
}

function march(ctx, formula) {
  const grid = [];
  const squares = [];
  for (var x = 0; x < canvas.width / GRID_SIZE; x++) {
	grid.push([]);
	for (var y = 0; y < canvas.height / GRID_SIZE; y++) {
	  const v = formula(x * GRID_SIZE, y * GRID_SIZE);
	  grid[grid.length-1].push(v);
	  if (x > 0 && y > 0) {
		squares.push({
		  x: x,
		  y: y,
		  tl: grid[x-1][y-1],
		  tr: grid[x][y-1],
		  bl: grid[x-1][y],
		  br: v,
		})
	  }
	}
  }
  //console.log(squares);
  
  // Test grid
  /*for (var x = 0; x < canvas.width / GRID_SIZE; x++) {
	for (var y = 0; y < canvas.height / GRID_SIZE; y++) {
		ctx.fillStyle = (grid[x][y] > 1) ? "#FF0000" : "#0000FF";
		ctx.fillRect(x * GRID_SIZE,y * GRID_SIZE,3,3);
	}
  }*/
  
  // Test squares
  /*squares.forEach(square => {
	const x = square.x;
	const y = square.y;
	ctx.fillStyle = (square.tl > 1) ? "#FF0000" : "#0000FF";
	ctx.fillRect((x) * GRID_SIZE,(y) * GRID_SIZE,3,3);

	ctx.fillStyle = (square.tr > 1) ? "#FF0000" : "#0000FF";
	ctx.fillRect((x+1) * GRID_SIZE,(y) * GRID_SIZE,3,3);

	ctx.fillStyle = (square.bl > 1) ? "#FF0000" : "#0000FF";
	ctx.fillRect((x) * GRID_SIZE,(y+1) * GRID_SIZE,3,3);

	ctx.fillStyle = (square.br > 1) ? "#FF0000" : "#0000FF";
	ctx.fillRect((x+1) * GRID_SIZE,(y+1) * GRID_SIZE,3,3);
  });*/
  
  squares.map((square) => {

	var v = square.tl > 1;
	v |= (square.tr > 1) << 1;
	v |= (square.bl > 1) << 2;
	v |= (square.br > 1) << 3;
	
	const x = square.x * GRID_SIZE;
	const y = square.y * GRID_SIZE;
	
	switch (v) {
	  case 0:
		return [];
	  case 15:
		return [];
	  // o--+
	  // |/ |
	  // +--+
	  case 1:
		return [{
		  x0: linearInterp(square.tl, square.tr, x),
		  y0: y,
		  x1: x,
		  y1: linearInterp(square.tl, square.bl, y),
		}];
	  // +--o
	  // | \|
	  // +--+
	  case 2:
		return [{
		  x0: linearInterp(square.tl, square.tr, x),
		  y0: y,
		  x1: x + GRID_SIZE,
		  y1: linearInterp(square.tr, square.br, y),
		}];
	  // o--o
	  // |--|
	  // +--+
	  case 3:
		return [{
		  x0: x,
		  y0: linearInterp(square.tl, square.bl, y),
		  x1: x + GRID_SIZE,
		  y1: linearInterp(square.tr, square.br, y),
		}];
	  // +--+
	  // |\ |
	  // o--+
	  case 4:
		return [{
		  x0: x,
		  y0: linearInterp(square.tl, square.bl, y),
		  x1: linearInterp(square.bl, square.br, x),
		  y1: y + GRID_SIZE,
		}];
	  // o--+
	  // || |
	  // o--+
	  case 5:
		return [{
		  x0: linearInterp(square.tl, square.tr, x),
		  y0: y,
		  x1: linearInterp(square.bl, square.br, x),
		  y1: y + GRID_SIZE,
		}];
	  // +--o
	  // |\\|
	  // o--+
	  case 6:
		return [{
		  x0: x,
		  y0: linearInterp(square.tl, square.bl, y),
		  x1: linearInterp(square.bl, square.br, x),
		  y1: y + GRID_SIZE,
		}, {
		  x0: linearInterp(square.tl, square.tr, x),
		  y0: y,
		  x1: x + GRID_SIZE,
		  y1: linearInterp(square.tr, square.br, y),
		}];
	  // o--o
	  // | /|
	  // o--+
	  case 7:
		return [{
		  x0: x + GRID_SIZE,
		  y0: linearInterp(square.tr, square.br, y),
		  x1: linearInterp(square.bl, square.br, x),
		  y1: y + GRID_SIZE,
		}];
	  // +--+
	  // | /|
	  // +--o
	  case 8:
		return [{
		  x0: x + GRID_SIZE,
		  y0: linearInterp(square.tr, square.br, y),
		  x1: linearInterp(square.bl, square.br, x),
		  y1: y + GRID_SIZE,
		}];
	  // o--+
	  // |//|
	  // +--o
	  case 9:
		return [{
		  x0: linearInterp(square.tl, square.tr, x),
		  y0: y,
		  x1: x, // e
		  y1: linearInterp(square.tl, square.bl, y),
		}, {
		  x0: linearInterp(square.bl, square.br, x),
		  y0: y + GRID_SIZE, // e
		  x1: x + GRID_SIZE,
		  y1: linearInterp(square.tr, square.br, y),
		}];
	  // +--o
	  // | ||
	  // +--o
	  case 10:
		return [{
		  x0: linearInterp(square.tl, square.tr, x),
		  y0: y,
		  x1: linearInterp(square.bl, square.br, x),
		  y1: y + GRID_SIZE,
		}];
	  // o--o
	  // |\ |
	  // +--o
	  case 11:
		return [{
		  x0: x,
		  y0: linearInterp(square.tl, square.bl, y),
		  x1: linearInterp(square.bl, square.br, x),
		  y1: y + GRID_SIZE,
		}];
	  // +--+
	  // |--|
	  // o--o
	  case 12:
		return [{
		  x0: x,
		  y0: linearInterp(square.tl, square.bl, y),
		  x1: x + GRID_SIZE,
		  y1: linearInterp(square.tr, square.br, y),
		}];
	  // o--+
	  // | \|
	  // o--o
	  case 13:
		return [{
		  x0: linearInterp(square.tl, square.tr, x),
		  y0: y,
		  x1: x + GRID_SIZE,
		  y1: linearInterp(square.tr, square.br, y),
		}];
	  // +--o
	  // |/ |
	  // o--o
	  case 14:
		return [{
		  x0: linearInterp(square.tl, square.tr, x),
		  y0: y,
		  x1: x,
		  y1: linearInterp(square.tl, square.bl, y),
		}];
	}
  }).forEach(lines => {
	ctx.beginPath();
	lines.flat().forEach(line => {
	  //ctx.strokeStyle = line.q ? "#FF0000" : "#000000";
	  ctx.moveTo(line.x0, line.y0);
	  ctx.lineTo(line.x1, line.y1);
	});
	ctx.stroke();
  }, error => {
	console.log(error);
  });
}