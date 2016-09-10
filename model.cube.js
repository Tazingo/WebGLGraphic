var cube = new function(){
	this.drawType= 4;
	this.vertices = [
	vec4( -0.5, -0.5,  0.5, 1.0 ),
	vec4( -0.5,  0.5,  0.5, 1.0 ),
	vec4( 0.5,  0.5,  0.5, 1.0 ),
	vec4( 0.5, -0.5,  0.5, 1.0 ),
	vec4( -0.5, -0.5, -0.5, 1.0 ),
	vec4( -0.5,  0.5, -0.5, 1.0 ),
	vec4( 0.5,  0.5, -0.5, 1.0 ),
	vec4( 0.5, -0.5, -0.5, 1.0 )
	];
	this.points = [];
	this.normals = [];
	this.colors = [];
	this.quad = function(a, b, c, d) {

		var t1 = subtract(this.vertices[b], this.vertices[a]);
		var t2 = subtract(this.vertices[c], this.vertices[b]);
		var normal = cross(t1, t2);
		var normal = vec4(normal,0);


    
		var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0],  // black
        [ 1.0, 0.0, 0.0, 1.0],  // red
        [ 1.0, 1.0, 0.0, 1.0],  // yellow
        [ 0.0, 1.0, 0.0, 1.0],  // green
        [ 0.0, 0.0, 1.0, 1.0],  // blue
        [ 1.0, 0.0, 1.0, 1.0],  // magenta
        [ 0.0, 1.0, 1.0, 1.0],  // cyan
        [ 1.0, 1.0, 1.0, 1.0]   // white
        ];
        var indices = [ a, b, c, a, c, d ];

        for ( var i = 0; i < indices.length; ++i ) {
            this.points.push(this.vertices[indices[i]]); 
            this.normals.push(normal); 
        	this.colors.push(vertexColors[indices[i]]);

        }
    }
    this.Cube = function()
    {
    	this.quad( 1, 0, 3, 2 );
    	this.quad( 2, 3, 7, 6 );
    	this.quad( 3, 0, 4, 7 );
    	this.quad( 6, 5, 1, 2 );
    	this.quad( 4, 5, 6, 7 );
    	this.quad( 5, 4, 0, 1 );
    }
    this.get = function(){
    	this.points=[];
    	this.colors=[];
    	this.normals=[];
    	this.Cube();
    	var r = {
    		'points': this.points,
    		'colors': this.colors,
    		'normals': this.normals,
    		'drawType':this.drawType
    	}
    	return r;
    }
}