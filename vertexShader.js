precision mediump float;
attribute vec4 vertex;
attribute vec4 normal;
attribute vec4 color;

uniform mat4 Model_Matrix;
uniform mat4 View_Matrix;
uniform mat4 Proj_Matrix;

varying vec3 outNormal;
varying vec4 outColor;
varying vec3 position;

void main()
{
    mat4 mvpMat = Proj_Matrix * View_Matrix * Model_Matrix;
    mat4 mvMat = View_Matrix * Model_Matrix;
    mat4 normalMat = View_Matrix * Model_Matrix;
    
    
    gl_Position = mvpMat * vertex;
    position = vec3(mvMat*vertex);
    outNormal = vec3(normalMat * normal);
    outColor = color;
}