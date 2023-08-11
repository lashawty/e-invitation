export const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

export const fragmentShader = `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    void main() {
        vec4 textureColor = texture2D(uTexture, vec2(vUv.x, vUv.y)); 
        gl_FragColor = textureColor; 
    }
`;