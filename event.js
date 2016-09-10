
var handler = new function(){
	this.oldMouseX=0;
	this.oldMouseY=0;
	this.MouseDeltaX=0;
	this.MouseDeltaY=0;

	/*
	getMousePosition
	@param event mouse event
	@param p program
	@return [lX,lY] mouse location x,y
	*/
	this.getMousePosition = function(event,program){
		var canvas = document.getElementById(program['canvas']);
		if (event.x != undefined && event.y != undefined) {
			lX = event.x + document.body.scrollLeft +
			document.documentElement.scrollLeft;
			lY = event.y + document.body.scrollTop +
			document.documentElement.scrollTop;
		} else {
	        // Firefox method to get the position
	        lX = event.clientX + document.body.scrollLeft +
	        document.documentElement.scrollLeft;
	        lY = event.clientY + document.body.scrollTop +
	        document.documentElement.scrollTop;
	    }

	    lX -= canvas.offsetLeft;
	    lY -= canvas.offsetTop;
	    return [lX,lY];
	}

	/*
	getMousesMoveDelta
	@param e event
	@param p program
	@return [x,y] deltaX, deltaY
	*/
	this.getMouseMoveDelta = function(e,p){
		var mp = handler.getMousePosition(e,p);
		this.MouseDeltaX = mp[0] - this.oldMouseX;
		this.MouseDeltaY = mp[1] - this.oldMouseY;
		this.oldMouseX = mp[0];
		this.oldMouseY = mp[1];
		return [this.MouseDeltaX,this.MouseDeltaY];
	}
	/*
	bindEvent
	@param program program
	*/
	this.bindEvent=function(program){
		var canvas = document.getElementById(program['canvas']);
		// disable right click menu
		canvas.oncontextmenu=function(){return false};
		//reset canvas on 
		window.addEventListener('resize',function(){
			program['projMatrix']=projMatrix();
		})
		canvas.addEventListener('mousemove',function(event){
			handler.getMouseMoveDelta(event,program);
		})
		// Event pool
		program.eventPool=[];
		// Custom event
		var eventList = Object.keys(program['event']);

		eventList.forEach(function(e){
			document.addEventListener(e,function(event){ program['event'][e](event,program)})
		})
	}
	/*
	fpFreelook First personal free look
	@param v view matrix 
	@return [x,y,z] at
	*/
	this.fpFreeLook=function(v){
		var ax = 180*this.MouseDeltaX*0.1/window.innerWidth;
		var ay = 180*-this.MouseDeltaY*0.05/window.innerHeight;
		var at = [v['at'][0]-v['eye'][0],
		v['at'][1]-v['eye'][1],
		v['at'][2]-v['eye'][2]]
		// left and right 
		var vcos = Math.cos(ax);
		var vsin = Math.sin(ax);
		var vx = at[0]*vcos-at[2]*vsin;
		var vz = at[0]*vsin+at[2]*vcos;
		
		// up and down
		var dCE = Math.sqrt(vx*vx+vz*vz);
		var hsin = Math.sin(ay);
		var hcos = Math.cos(ay);
		var x = dCE*hcos-at[1]*hsin;
		var y = dCE*hsin+at[1]*hcos;
		var z = 0;
		var pc = x/dCE;
		
		var nv = vec3(v['eye'][0]+pc*vx,
			v['eye'][1]+y,
			v['eye'][2]+pc*vz)
		return nv;
	}
	/*
	fpMove first personal move
	@param v view matrix
	@return [eye,at] eye
	*/
	this.fpMoveForward= function(v,step){
		var n = normalize([v['at'][0]-v['eye'][0],v['at'][1]-v['eye'][1],v['at'][2]-v['eye'][2]]);
		var ne = [
			v['eye'][0] + n[0]*step,
			v['eye'][1] + n[1]*step,
			v['eye'][2] + n[2]*step
		]
		var nv = [
			v['at'][0] + n[0]*step,
			v['at'][1] + n[1]*step,
			v['at'][2] + n[2]*step
		] 
		return [ne,nv]
	},

	this.fpMoveBackward= function(v,step){
		var n = normalize([v['at'][0]-v['eye'][0],v['at'][1]-v['eye'][1],v['at'][2]-v['eye'][2]]);
		var ne = [
			v['eye'][0] - n[0]*step,
			v['eye'][1] - n[1]*step,
			v['eye'][2] - n[2]*step
		]
		var nv = [
			v['at'][0] - n[0]*step,
			v['at'][1] - n[1]*step,
			v['at'][2] - n[2]*step
		] 
		return [ne,nv]
	},
	this.fpMoveRight= function(v,step){
		var o = normalize([v['at'][0]-v['eye'][0],v['at'][1]-v['eye'][1],v['at'][2]-v['eye'][2]]);
		var n = cross(o,v['up']);
		var ne = [
			v['eye'][0] + n[0]*step,
			v['eye'][1] + n[1]*step,
			v['eye'][2] + n[2]*step
		]
		var nv = [
			v['at'][0] + n[0]*step,
			v['at'][1] + n[1]*step,
			v['at'][2] + n[2]*step
		] 
		return [ne,nv]
	},
	this.fpMoveLeft= function(v,step){
		var o = normalize([v['at'][0]-v['eye'][0],v['at'][1]-v['eye'][1],v['at'][2]-v['eye'][2]]);
		var n = cross(o,v['up']);
		var ne = [
			v['eye'][0] - n[0]*step,
			v['eye'][1] - n[1]*step,
			v['eye'][2] - n[2]*step
		]
		var nv = [
			v['at'][0] - n[0]*step,
			v['at'][1] - n[1]*step,
			v['at'][2] - n[2]*step
		] 
		return [ne,nv]
	}
}