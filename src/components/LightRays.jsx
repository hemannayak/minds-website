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
  uniform vec2  u_mouse;
  uniform vec3  u_color;
  uniform float u_speed;
  uniform float u_spread;
  uniform float u_rayLength;
  uniform float u_fade;
  uniform float u_saturation;
  uniform float u_mouseInfl;
  uniform float u_distortion;
  uniform float u_noise;

  /* Gaussian bell curve — the core of soft light rendering.
     No hard edges: at x=0 value is 1, falls off smoothly to 0. */
  float gauss(float x, float sigma) {
    return exp(-0.5 * (x / sigma) * (x / sigma));
  }

  /* Simple value noise for very subtle shimmer */
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),           hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    /* WebGL Y=0 is bottom; we want origin at TOP so rays fan downward */
    vec2 uvT = vec2(uv.x, 1.0 - uv.y);

    /* Light origin: top-centre, drifts very slightly with mouse */
    vec2 origin = vec2(0.5 + u_mouse.x * u_mouseInfl, -0.02);
    vec2 dir    = uvT - origin;
    float dist  = length(dir);

    /* Angle from straight-down, in radians — range roughly -PI..PI */
    float angle = atan(dir.x * u_spread, max(dir.y, 0.0001));

    float t = u_time * u_speed;

    /* ─── Beam definitions: angle offset + angular sigma + intensity ─────
       All offsets oscillate with slow, independent sin() drifts so the
       beams breathe naturally — matched to the reference image style.    */

    /* 1. Central main beam — widest, brightest, barely moves */
    float a0    = sin(t * 0.13) * 0.04;
    float beam0 = gauss(angle - a0, 0.55) * 1.0;

    /* 2. Left secondary beam */
    float a1    = -0.42 + sin(t * 0.09 + 1.2) * 0.06;
    float beam1 = gauss(angle - a1, 0.28) * 0.55;

    /* 3. Right secondary beam */
    float a2    = 0.42 + sin(t * 0.11 + 2.5) * 0.06;
    float beam2 = gauss(angle - a2, 0.28) * 0.55;

    /* 4. Broad ambient halo — fills the full cone softly */
    float beam3 = gauss(angle, 1.1 * u_spread) * 0.25;

    /* Sum all beams */
    float rays = beam0 + beam1 + beam2 + beam3;

    /* Very subtle shimmer — just enough to break uniformity */
    float shimmer = vnoise(uvT * 6.0 + vec2(t * 0.15, 0.0)) * u_noise * 0.4;
    rays += shimmer;

    /* ─── Falloff layers ─────────────────────────────────────────────── */

    /* Radial: exponential decay from origin — fills hero width */
    float radialFade = exp(-dist / max(u_rayLength * 0.28, 0.01));

    /* Vertical: light vanishes smoothly before the section bottom */
    float bottomFade = 1.0 - smoothstep(0.18, 0.82, uvT.y);

    /* Horizontal: wide Gaussian keeps rays centred, edges breathe out */
    float sideWidth  = 0.48 * u_spread;
    float sideFade   = gauss(uvT.x - 0.5 - u_mouse.x * u_mouseInfl * 0.4, sideWidth);

    /* Combine and scale — kept very low for the light SaaS background */
    float alpha = rays * radialFade * bottomFade * sideFade * u_saturation;
    alpha = clamp(alpha, 0.0, 1.0) * 0.28;

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

    // ── resize — handles both element reflow & orientation changes ────────
    const resize = () => {
      const target = canvas.parentElement || canvas;
      const w = target.offsetWidth;
      const h = target.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    // ResizeObserver: element-level size changes (flex reflow etc.)
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    // window resize: catches iOS/Android orientation switches
    window.addEventListener('resize', resize, { passive: true });

    // ── pointer tracking — mouse (desktop) + touch (mobile/tablet) ────────
    const parent = canvas.parentElement;

    const onMove = (e) => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    };

    // Touch: read first finger, same normalised coordinate system
    const onTouch = (e) => {
      if (!parent || !e.touches.length) return;
      const t0 = e.touches[0];
      const rect = parent.getBoundingClientRect();
      mouseRef.current.x = (t0.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current.y = (t0.clientY - rect.top) / rect.height - 0.5;
    };

    if (parent) {
      parent.addEventListener('mousemove', onMove, { passive: true });
      parent.addEventListener('touchmove', onTouch, { passive: true });
      parent.addEventListener('touchstart', onTouch, { passive: true });
    }

    // ── render loop — pauses when tab/app is hidden (saves mobile battery)
    let paused = false;
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    const start = performance.now();
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      if (paused) return;                         // skip GPU work when hidden
      const ts = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, ts);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (parent) {
        parent.removeEventListener('mousemove', onMove);
        parent.removeEventListener('touchmove', onTouch);
        parent.removeEventListener('touchstart', onTouch);
      }
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
