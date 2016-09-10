

function initGl(canvasid){
	canvas = document.getElementById( canvasid );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.style.margin = 0;
	document.body.style.overflow='hidden';
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

	gl.enable(gl.DEPTH_TEST);
	window.onresize = function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		gl.viewport( 0, 0, canvas.width, canvas.height );
	}
	return gl
}
function createProgram(vs,fs){
	var program = initShaders( gl, vs, fs );
	return program;
}


function modelMatrix(trans){
	var r = trans[0];
	for(var i=0;i<trans.length;i++){
		if(typeof trans[i+1] === 'undefined'){
			break;
		}else if(typeof trans[i+1] === 'function'){
			r = mult(r,trans[i+1]());
		}else{
			r = mult(r,trans[i+1]);
		}
	}
	return r;
}
function viewMatrix(eye,at,up){
	var view = lookAt(eye,at,up);
	return view;
}
function projMatrix(){
	var w = window.innerWidth/window.innerHeight;
    var M = perspective(60,w,0.1,1000);
    //var M = ortho(-1, 1, -1, 1, -100, 100);
    return M;
}

function drawSence(program){
	gl.useProgram(program['program']);
	//push proj and view
	uniform(program['program'],"Proj_Matrix",program['projMatrix'],'Matrix4fv');
	var vm = viewMatrix(program['viewMatrix']['eye'],program['viewMatrix']['at'],program['viewMatrix']['up']);
    uniform(program['program'],"View_Matrix",vm,'Matrix4fv');
    if(typeof program['light'] === 'object'){
    	var light = program['light'];
    	light.forEach(function(e){
	    	uniform(program['program'],'u_lightPos1',e['position'],'4fv');
	    	uniform(program['program'],'u_lightColor1',e['color'],'4fv');
		})
	}
    //push models
	var models = program['model'];
	models.forEach(function(e){
		//push model matrix
		var modelView;
		if(typeof e['trans'] === 'object'){
			modelView = modelMatrix(e['trans']);
		}else{
			modelView = mat4();
		}
		uniform(program['program'],'Model_Matrix',modelView,'Matrix4fv');
		//push model
	    if(typeof e['normals'] === 'object'){
		    pushAttr(program['program'],e['normals'],"normal",4);
		}
	    pushAttr(program['program'],e['points'],"vertex",4);
	    pushAttr(program['program'],e['colors'],"color",4);
	    //push light
	    
	    //draw
	    gl.drawArrays( e['drawType'], 0, e['points'].length );
	})
}

function uniform(prog,uvar,data,type){
        var loc = gl.getUniformLocation(prog, uvar);
        var str;
        str = 'gl.uniform'+type+'(';
        str+= 'loc,';
        if(type.indexOf('Matrix')>-1){
            str+='false,';
        }
        str+='flatten(data))';
        eval(str);
    }

function pushAttr(p,a,u,s){
	var Buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, Buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(flatten(a)), gl.STATIC_DRAW );
    var attr= gl.getAttribLocation(p, u);
    gl.vertexAttribPointer(attr, s, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attr);
}

frames = 0;
fps = 0;
setInterval(function(){
	fps = frames;
	frames = 0;
	console.log(fps);
},1000)
function render(p){
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	p.forEach(function(e){
		drawSence(e);
	})
	++frames;
	requestAnimFrame(function(){
		render(p);
	});
}

function Mscale( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][0] = x;
    result[1][1] = y;
    result[2][2] = z;

    return result;
}