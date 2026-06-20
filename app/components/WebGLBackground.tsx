'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight raw-WebGL background.
 *
 * Replaces the previous react-three-fiber / three.js particle cloud.
 * A single full-screen fragment shader renders a flowing brand-colored
 * aurora plus three parallax layers of drifting, twinkling particles that
 * react to the pointer — the same "interactive particle" identity, at a
 * fraction of the bundle size (no three/fiber/drei) and GPU-cheap.
 *
 * Robustness:
 *  - Feature-detects WebGL; bails silently if unavailable (CSS stays).
 *  - Honors prefers-reduced-motion (renders one static frame, no loop).
 *  - Pauses the RAF loop when the tab is hidden.
 *  - Renders at a downscaled backing resolution (CSS upscales) so the
 *    fragment-heavy shader stays cheap, especially on mobile.
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;

// Brand palette
const vec3 MIDNIGHT = vec3(0.082, 0.059, 0.137); // #150f23
const vec3 VIOLET   = vec3(0.416, 0.373, 0.757); // #6a5fc1
const vec3 VIOLETD  = vec3(0.259, 0.125, 0.510); // #422082
const vec3 LIME     = vec3(0.761, 0.937, 0.306); // #c2ef4e
const vec3 PINK     = vec3(0.980, 0.498, 0.667); // #fa7faa

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return v;
}

// Parallax twinkling particle layer
float particles(vec2 uv, float scale, float speed, float t, vec2 par) {
  vec2 p = uv * scale + par;
  p.y += t * speed;
  vec2 g = floor(p);
  vec2 f = fract(p);
  float acc = 0.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 cell = vec2(float(i), float(j));
      float h = hash(g + cell);
      if (h > 0.55) {
        vec2 center = cell + vec2(hash(g + cell + 1.3), hash(g + cell + 2.7));
        float d = length(f - center);
        float tw = 0.6 + 0.4 * sin(t * 2.0 + h * 30.0);
        acc += smoothstep(0.06, 0.0, d) * tw * (h - 0.55) * 2.2;
      }
    }
  }
  return acc;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
  float t = u_time * 0.05;

  vec2 m = (u_mouse - 0.5);

  // --- Aurora: domain-warped fbm ---
  vec2 q = p * 1.6;
  q += m * 0.25;
  float warp = fbm(q + vec2(t * 1.2, t * 0.6));
  float field = fbm(q + warp + vec2(-t * 0.5, t * 0.8));

  vec3 col = MIDNIGHT;
  col = mix(col, VIOLETD, smoothstep(0.25, 0.85, field) * 0.7);
  col = mix(col, VIOLET, smoothstep(0.45, 0.95, field) * 0.5);

  // Lime + pink ribbons riding the noise crests
  float ribbon = smoothstep(0.6, 0.75, field) * (0.4 + 0.6 * sin(field * 8.0 + t * 3.0));
  col += LIME * ribbon * 0.18;
  float pinkBand = smoothstep(0.55, 0.7, fbm(q * 1.3 - vec2(t)));
  col += PINK * pinkBand * 0.07;

  // Soft central violet glow following the pointer slightly
  float glow = smoothstep(0.9, 0.0, length(p - m * 0.3));
  col += VIOLET * glow * 0.10;

  // --- Particle layers (parallax + pointer offset) ---
  float pa = particles(uv, 14.0, 0.10, u_time, m * 0.20);
  float pb = particles(uv, 9.0,  0.06, u_time, m * 0.12);
  float pc = particles(uv, 22.0, 0.16, u_time, m * 0.30);
  col += vec3(1.0) * pa * 0.5;
  col += LIME * pb * 0.35;
  col += PINK * pc * 0.30;

  // Vignette to keep edges deep and content legible
  float vig = smoothstep(1.25, 0.35, length(p));
  col *= 0.55 + 0.45 * vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl', { antialias: false, alpha: false, depth: false }) ||
      canvas.getContext('experimental-webgl', { antialias: false })) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // Full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    // Downscale the heavy fragment shader; CSS upscales the canvas.
    const scale = isMobile ? 0.5 : 0.7;

    let width = 0;
    let height = 0;
    const resize = () => {
      width = Math.max(1, Math.floor(window.innerWidth * scale));
      height = Math.max(1, Math.floor(window.innerHeight * scale));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();

    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    const onPointer = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    let raf = 0;
    const start = performance.now();
    let running = true;

    const render = (now: number) => {
      const t = (now - start) / 1000;
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (running && !reduceMotion) raf = requestAnimationFrame(render);
    };

    if (reduceMotion) {
      // One static frame only.
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, 12.0);
      gl.uniform2f(uMouse, 0.5, 0.5);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(render);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduceMotion && !running) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
