var shadow = new function(){
		this.size = 256;
		//this.shadowMapWidth=2048;
		//this.shadowMapHeight=2048;
	this.initShadowBuffer = function(p){
		

	 	var colorTexture = gl.createTexture();
	 	gl.bindTexture(gl.TEXTURE_2D, colorTexture);
	 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	 	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	 	gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	 	gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	 	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.size ,this.size ,0, gl.RGBA, gl.UNSIGNED_BYTE,null);

	 	var depthBuffer = gl.createRenderbuffer();
	 	gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
	 	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.size ,this.size );

	 	var frameBuffer = gl.createFramebuffer();
	 	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	 	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTexture, 0);
	 	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

	 	if(!gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
            console.error("Framebuffer incomplete!");
        }
        
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	this.POV = function(p,l){
		gl.colorMask(false, false, false, false);
		var ov = p['viewMatrix'];
		
	}
}