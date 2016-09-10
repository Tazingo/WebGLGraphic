Jinbao Xiao
Jinxiao@indiana.edu
Assignment A4
=======================
Not fully implement all the feature I wanted yet
Could be an interesting stuff
Enjoy

========================

Structure of program
You can define your own program via simply define a array

program : array

	canvas : string canvas id

	program : gl program, not finish this, I use createProgram() now

	viewMatrix : array
		eye : vec3 eye position
		at : look at
		up : up vector

	projMatrix : mat4 projection matrix, auto fit the height width ration by invoke projMatrix(), not complete

	light : array
		Array of lights:
			position : vec4 position
			color : vec4 color
		this is not finish, I didn't implement the multiple lights fragment shader

	shadow : boolean, not finish, tricky stuff

	event : array 
		event type : function
	you can simply define a event

	model : array , each element in this array represent a object
		array of models :
			trans : array , a array of transformation of model, able to push a function in this array
			points : array , a array record all the point of model
			normals : array , a array record all the normal of model
			colors : array , colors array

Then you need call handler.bindEvent() to bind your event

push all programs in a array and call render() 

Then, you get your world
		

=======================

Bugs and unimplemented

Teapot model not finish
I really want to finish this one, the teapot seems like "hello world" in graphics.

Move function need to be refactor
Move need to save the status rather than invoke the function

Light didn't have a model yet,
press E will set the Light in front of the view, but the position is invisable

Shadow mapping not complete yet
Shadow mapping in WebGL is tricky

Light tracing not complete
This is a really hard algorithm, but it's fantastic


=======================

Library Decription

entry
	initGl(canvasid)
		canvasid : id of canvas
		return gl
		init gl of canvas

	createProgram(vs,fs)
		vs : vertex shader
		fs : fragment shader
		return program
		create a webgl program

	modelMatrix(trans)
		trans : a array of model transformation
		return mat4 
		mult all transformation matrix and return

	viewMatrix(eye,at,up)
		eye: vec3 eye postion
		at: vec3 look at postion
		up: vec3 up vector
		return mat4 UVN matrix

	projMatrix()
		return mat4 projection matrix

	drawSence(program)
		program : program

	uniform(prog,uvar,data,type)
		prog : gl program
		uvar : uniform variable
		data : data
		type : type of data 3fv, Matrix4fv
		push uniform data to shader

	pushAttr(p,a,u,s)
		p : gl program
		a : data array
		u : attibute variable
		s : size of data
		push attribute data to shader

	render(p)
		p : program
		render 

	Mscale( x, y, z )
		rename the scale function for matrix in MV.js
		In MV.js, there are two scale function, one for matrix, other one for vector

shadow
	.initShadowBuffer(p)
		p : gl program
		initial shadow buffer

	.POV(p,l)
		p : gl program
		l : light position
		not finished

event
	.getMousePosition(event,program)
		event : Mouse event
		program : program
		return [x,y] of current mouse postion

	.getMouseMoveDelta(e,p)
		e : event
		p : program
		return [x,y] of mouse postion delta

	.bindEvent(program)
		program : program
		bind event in program.event

	.fpFreeLook(v)
		v : [eye,at,up]
		return new at
		first personal free look via mouse move

	.fpMoveForward/Backward/Left/Right(v,step)
		v : [eye,at,up]
		step : distance of a step
		return [eye,at]
		first personal move, 4 directions

model.[shape]
	.get()
		get model