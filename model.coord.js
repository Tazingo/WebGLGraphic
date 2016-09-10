var coord = new function(){
	this.drawType= 1;
	this.points = {};
	this.points['x'] = [
		vec4(0,0,0,1),
		vec4(1,0,0,1)
	]
	this.points['y'] = [
		vec4(0,0,0,1),
		vec4(0,1,0,1)
	]
	this.points['z'] = [
		vec4(0,0,0,1),
		vec4(0,0,1,1)
	]
	this.colors = {};
	this.colors['x'] = [vec4(1,0,0,1),vec4(1,0,0,1)];
	this.colors['y'] = [vec4(0,1,0,1),vec4(0,1,0,1)];
	this.colors['z'] = [vec4(0,0,1,1),vec4(0,0,1,1)];
	this.get = function(a){
		var r = {
			'points': this.points[a],
			'colors': this.colors[a],
			'drawType':this.drawType
		}
		return r;
	}
}