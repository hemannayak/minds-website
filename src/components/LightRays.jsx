import { useRef, useEffect } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   LightRays — WebGL fragment-shader light rays tuned for a light SaaS theme.
   Props mirror the react-bits LightRays API so the component can be swapped
   directly if the library is ever added.
───────────────────────────────────────────────────────────────────────────── */

const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision mediump float;

  uniform vec2  u_resolution;
  uniform float u_time;
  uniform vec2  u_mouse;       // normalised 0..1
  uniform vec3  u_color;       // ray colour
  uniform float u_speed;
  uniform float u_spread;      // angular spread multiplier
  uniform float u_rayLength;   // length multiplier
  uniform float u_fade;        // fade distance
  uniform float u_saturation;  // overall opacity scale
  uniform float u_mouseInfl;   // mouse influence
  uniform float u_distortion;
  uniform float u_noise;

  // Hash / value noise helpers
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(
      mix(hash(i), hash(i+vec2(1,0)), f.x),
      mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    // Origin: slightly above centre-top so rays fan downward
    vec2 origin = vec2(0.5 + u_mouse.x * u_mouseInfl, -0.05);

    vec2 dir = uv - origin;
    float dist = length(dir);
    float angle = atan(dir.x * u_spread, dir.y) / 3.14159;

    float t = u_time * u_speed;

    // Layer several ray bands
    float rays = 0.0;
    for (int i = 0; i < 8; i++) {
      float fi = float(i);
      float offset = hash(vec2(fi, 0.0)) * 2.0 - 1.0;
      float width  = 0.015 + hash(vec2(fi, 1.0)) * 0.025;
      float speed  = 0.3 + hash(vec2(fi, 2.0)) * 0.4;
      float bandAngle = angle + offset * 0.55 + sin(t * speed + fi) * 0.04;
      float band = smoothstep(width, 0.0, abs(fract(bandAngle * 5.0) - 0.5));

      // Distortion ripple
      float ripple = u_distortion * sin(dist * 12.0 - t * 1.5 + fi * 2.1);
      band *= 1.0 + ripple;

      // Noise speckle
      float speckle = u_noise * noise(uv * 40.0 + vec2(t * 0.4 + fi, fi));
      band += speckle * 0.3;

      rays += band * (0.6 + 0.4 * hash(vec2(fi, 3.0)));
    }

    // Distance-based fade: rays fall off quickly below the origin
    float lenFade = 1.0 - smoothstep(0.0, u_fade * 0.35, dist / u_rayLength);
    // Extra fade toward bottom of screen for a clean transition
    float bottomFade = 1.0 - smoothstep(0.35, 0.85, uv.y);
    // Soft vignette on sides
    float sideFade = 1.0 - smoothstep(0.3, 0.5, abs(uv.x - 0.5 - u_mouse.x * u_mouseInfl * 0.5));

    float alpha = rays * lenFade * bottomFade * sideFade * u_saturation;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(u_color * alpha, alpha);
  }
`;

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
}

const LightRays = ({
    raysColor = '#818CF8',   // indigo-400
    raysSpeed = 0.4,
    lightSpread = 1.5,
    rayLength = 6,
    fadeDistance = 2,
    saturation = 0.9,
    mouseInfluence = 0.05,
    distortion = 0.08,
    noiseAmount = 0.01,
    /* pulsating is intentionally ignored — not needed for light theme */
    className = '',
    style = {},
}) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
        if (!gl) return; // graceful fallback — canvas stays transparent

        // ── compile shaders ────────────────────────────────────────────────
        const compile = (type, src) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };
        const prog = gl.createProgram();
        gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        // Full-screen quad
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
        );
        const aPos = gl.getAttribLocation(prog, 'a_position');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        // Uniform locations
        const uRes = gl.getUniformLocation(prog, 'u_resolution');
        const uTime = gl.getUniformLocation(prog, 'u_time');
        const uMouse = gl.getUniformLocation(prog, 'u_mouse');
        const uColor = gl.getUniformLocation(prog, 'u_color');
        const uSpeed = gl.getUniformLocation(prog, 'u_speed');
        const uSpread = gl.getUniformLocation(prog, 'u_spread');
        const uRayLen = gl.getUniformLocation(prog, 'u_rayLength');
        const uFade = gl.getUniformLocation(prog, 'u_fade');
        const uSat = gl.getUniformLocation(prog, 'u_saturation');
        const uMInfl = gl.getUniformLocation(prog, 'u_mouseInfl');
        const uDist = gl.getUniformLocation(prog, 'u_distortion');
        const uNoise = gl.getUniformLocation(prog, 'u_noise');

        const [r, g, b] = hexToRgb(raysColor);
        gl.uniform3f(uColor, r, g, b);
        gl.uniform1f(uSpeed, raysSpeed);
        gl.uniform1f(uSpread, lightSpread);
        gl.uniform1f(uRayLen, rayLength);
        gl.uniform1f(uFade, fadeDistance);
        gl.uniform1f(uSat, saturation);
        gl.uniform1f(uMInfl, mouseInfluence);
        gl.uniform1f(uDist, distortion);
        gl.uniform1f(uNoise, noiseAmount);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // ── resize ────────────────────────────────────────────────────────
        const resize = () => {
            const { offsetWidth: w, offsetHeight: h } = canvas.parentElement || canvas;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uRes, canvas.width, canvas.height);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas.parentElement || canvas);

        // ── mouse tracking ─────────────────────────────────────────────────
        const parent = canvas.parentElement;
        const onMove = (e) => {
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            mouseRef.current.x = (e.clientX - rect.left) / rect.width - 0.5;
            mouseRef.current.y = (e.clientY - rect.top) / rect.height - 0.5;
        };
        if (parent) parent.addEventListener('mousemove', onMove, { passive: true });

        // ── render loop ────────────────────────────────────────────────────
        const start = performance.now();
        const draw = () => {
            const t = (performance.now() - start) / 1000;
            gl.uniform1f(uTime, t);
            gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            rafRef.current = requestAnimationFrame(draw);
        };
        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
            if (parent) parent.removeEventListener('mousemove', onMove);
            gl.deleteProgram(prog);
            gl.deleteBuffer(buf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raysColor, raysSpeed, lightSpread, rayLength, fadeDistance,
        saturation, mouseInfluence, distortion, noiseAmount]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className={className}
            style={{
                display: 'block',
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                ...style,
            }}
        />
    );
};

export default LightRays;
