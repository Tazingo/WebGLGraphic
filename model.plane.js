var plane = new function(){
	this.drawType= 4;
	this.quad = function(a, b, c, d) {

		var t1 = subtract(this.vertices[b], this.vertices[a]);
		var t2 = subtract(this.vertices[c], this.vertices[b]);
		var normal = cross(t1, t2);
		var normal = vec4(normal,0);

		var indices = [ a, b, c, a, c, d ];

		for ( var i = 0; i < indices.length; ++i ) {
			this.points.push(this.vertices[indices[i]]); 
			this.normals.push(normal); 
			this.colors.push([0.8,0.8,0.8,1]);
		}
	}
	this.get = function(x,y){
		this.points=[];
		this.colors=[];
		this.normals=[];
		this.vertices=[];
		if(!x){x=1};
		if(!y){y=1};
		this.vertices.push(vec4(-x,-y,0,1));
		this.vertices.push(vec4(-x,y,0,1));
		this.vertices.push(vec4(x,y,0,1));
		this.vertices.push(vec4(x,-y,0,1));
		this.quad(1,0,3,2);
		var r = {
			'points': this.points,
			'colors': this.colors,
			'normals': this.normals,
			'drawType':this.drawType
		}
		return r;
	}
}