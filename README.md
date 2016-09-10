# WebGLGraphic
The final project for Interactive Graphics CSCI-B481 @ Spring 2015  
The 3D scene implemented via WebGL  

Not fully implement all the feature I wanted yet  
Could be an interesting stuff  
Enjoy  


# Structure of program
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

    	model : array , each element in this array represent a object
		    array of models :
		    	trans : array , a array of transformation of model, able to push a function in this array
		    	points : array , a array record all the point of model
		    	normals : array , a array record all the normal of model
		    	colors : array , colors array

Then you need call handler.bindEvent() to bind your event  
push all programs in a array and call render()   
Then, you get your world

# Bugs and unimplemented

Teapot model not finish  
Move function need to be refactor  
Move need to save the status rather than invoke the function  
Light didn't have a model yet,  
press E will set the Light in front of the view, but the light is invisable  
Shadow mapping not complete yet  
Light tracing not complete


