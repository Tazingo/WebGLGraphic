window.onload = function(){
	initGl("gl-canvas");
	ro = 0;
	program = {
		'canvas':'gl-canvas',
		'program':createProgram("vertex-shader", "fragment-shader"),
		'model': loadModel(),
		'viewMatrix': {
				'eye':vec3(0,10,0),
				'at':vec3(1,10,0),
				'up':vec3(0,1,0),
				},
		'projMatrix':projMatrix(),
		'light':[{
			'position':vec4(0,40,40,1),
			'color':vec4(1,1,1,1)
		}],
		'shadow':true,
		'event':{
			'keypress':function(e,p){
				
			},
			'keydown':function(e,p){
				if(e.keyCode==87){
					var n = handler.fpMoveForward(p['viewMatrix'],1);
					p['viewMatrix']['eye']=n[0];
					p['viewMatrix']['at'] =n[1];
				}else if(e.keyCode==83){
					var n = handler.fpMoveBackward(p['viewMatrix'],1);
					p['viewMatrix']['eye']=n[0];
					p['viewMatrix']['at'] =n[1];
				}else if(e.keyCode==65){
					var n = handler.fpMoveLeft(p['viewMatrix'],1);
					p['viewMatrix']['eye']=n[0];
					p['viewMatrix']['at'] =n[1];
				}else if(e.keyCode==68){
					var n = handler.fpMoveRight(p['viewMatrix'],1);
					p['viewMatrix']['eye']=n[0];
					p['viewMatrix']['at'] =n[1];
				}else if(e.keyCode==69){
					var e = p['viewMatrix']['eye'];
					var a = p['viewMatrix']['at'];
					
					var na = normalize(a.slice());
					var l = [
						p['viewMatrix']['eye'][0]+na[0]*10,
						p['viewMatrix']['eye'][1]+na[1]*10,
						p['viewMatrix']['eye'][2]+na[2]*10,
						1
					]
					p['light'][0]['position'] = l;
					console.log(p['viewMatrix']['at'])
				}
			},
			'mousemove':function(e,p){
				if(e.which == 3){
					p['viewMatrix']['at'] = handler.fpFreeLook(p['viewMatrix']);
				}
			}
		},

	}

	var programs = [];
	programs.push(program);
	handler.bindEvent(program);
	render(programs);
}

function loadModel(program){
	var model = [];
	model[0]=plane.get(1,1);
	model[0]['trans']=[mat4(),
					   Mscale(100,100,100),
					   rotate(-90,[1,0,0])
					   ]
	model[1]=cube.get();
	model[1]['trans']=[mat4(),
					   translate(0,5,0),
					   Mscale(10,10,10),
					   translate(3,0,0),
					   //rotate(30, [1, 1, 0] ),
					   rotate(160, [0, 1, 0] ),
					   //rotate(50, [0, 0, 1] ),
					   ];
	model[2]=cube.get();
	model[2]['trans']=[mat4(),
					   translate(0,5,0),
					   Mscale(10,10,10),
					   translate(3,1,0),
					   function(){
					   	ro+=2;
					   	return rotate(ro,[0,1,0])
					   },
					   //rotate(30, [1, 1, 0] ),
					   rotate(70, [0, 1, 0] ),
					   //rotate(50, [0, 0, 1] ),
					   ];
	model[3]=cube.get();
	model[3]['trans']=[mat4(),
					   translate(0,5,0),
					   Mscale(10,10,10),
					   translate(3,2,0),
					   //rotate(30, [1, 1, 0] ),
					   rotate(250, [0, 1, 0] ),
					   //rotate(50, [0, 0, 1] ),
					   ];
	model[4]=coord.get('x');
	model[4]['trans'] = [Mscale(10,10,10)]
	model[5]=coord.get('y');
	model[5]['trans'] = [Mscale(10,10,10)]
	model[6]=coord.get('z');
	model[6]['trans'] = [Mscale(10,10,10)]
	
	return model;
}