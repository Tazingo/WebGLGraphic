precision mediump float;

varying vec3 outNormal;
varying vec3 outColor;
//varying vec2 outUV;
//varying vec3 outLightPos;
varying vec3 position;

uniform mat4 View_Matrix;

uniform vec3 u_lightDir0;
uniform vec3 u_lightColor0;

uniform vec3 u_lightPos1;
uniform vec3 u_lightColor1;

uniform vec3 u_lightPos2;
uniform vec3 u_lightDir2;
uniform vec3 u_lightColor2;
uniform float u_lightCosCutoff2;

void main()
{
    vec3 normal = normalize(outNormal);
    vec3 surf2camera = normalize(-position);

    // Light 0:
    vec3 surf2light0 = normalize(-(View_Matrix*vec4(u_lightDir0,0.0)).xyz);
    float diffuse0 = max(0.0,dot(normal,surf2light0));

    // Light 1:
    vec3 surf2light1 = normalize((View_Matrix*vec4(u_lightPos1,1.0)).xyz - position);
    vec3 reflection1 = reflect(-surf2light1,normal);
    float diffuse1 = max(0.0,dot(normal,surf2light1));

    float specular1;
    if (dot(normal,surf2light1) < 0.0) {
        specular1 = 0.0;
    } else {
        specular1 = pow(max(0.0, dot(reflection1, surf2camera)), 50.0);
    }

    // Light 2:
    vec3 surf2light2 = normalize((View_Matrix*vec4(u_lightPos2,1.0)).xyz - position);
    float clampedCosine = max(0.0, dot(surf2light2, normalize(-(View_Matrix*vec4(u_lightDir2,0.0)).xyz)));
    float mask = 1.0;
    if (clampedCosine < u_lightCosCutoff2) mask = 0.0;
    float diffuse2 = mask * max(0.0,dot(normal,surf2light2));

    // total:
    vec3 totalDiffuseColor = diffuse0*u_lightColor0 + diffuse1*u_lightColor1 + diffuse2*u_lightColor2;
    vec3 totalSpecularColor = specular1 * u_lightColor1;
    vec3 totalColor = totalDiffuseColor + totalSpecularColor;

    //gl_FragColor = vec4(totalColor*outColor, 1.0);
    gl_FragColor = outColor;
}