"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Cube } from "@phosphor-icons/react";
export default function StudioOrbit() {
  const host = useRef<HTMLDivElement>(null),
    running = useRef(true);
  const [paused, setPaused] = useState(false),
    [interactive, setInteractive] = useState(false),
    [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    if (!interactive) return;
    const el = host.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      setPaused(true);
      running.current = false;
    }
    let disposed = false,
      frame = 0,
      cleanup = () => {};
    import("three")
      .then((T) => {
        if (disposed) return;
        let renderer: InstanceType<typeof T.WebGLRenderer>;
        try {
          renderer = new T.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.setClearColor(0x080a09, 0);
        const scene = new T.Scene(),
          camera = new T.PerspectiveCamera(36, 1, 0.1, 30);
        camera.position.z = 7.5;
        const group = new T.Group();
        scene.add(group);
        const core = new T.Mesh(
          new T.IcosahedronGeometry(1.05, 5),
          new T.MeshStandardMaterial({
            color: 0x212923,
            metalness: 0.88,
            roughness: 0.28,
            flatShading: false,
          }),
        );
        group.add(core);
        const rings = [1.5, 1.78, 2.08].map((r, i) => {
          const ring = new T.Mesh(
            new T.TorusGeometry(r, 0.013, 8, 140),
            new T.MeshStandardMaterial({
              color: 0xc5f66b,
              emissive: 0x657c25,
              emissiveIntensity: 0.6,
              metalness: 0.5,
              roughness: 0.4,
            }),
          );
          ring.rotation.set(0.6 + i * 0.7, 0.25 + i * 0.5, 0.3);
          group.add(ring);
          return ring;
        });
        scene.add(new T.HemisphereLight(0xe7f5dc, 0x070a08, 2.2));
        const key = new T.DirectionalLight(0xffffff, 5);
        key.position.set(3, 4, 3);
        scene.add(key);
        const rim = new T.PointLight(0xc5ff60, 16, 10);
        rim.position.set(-2, 1, 2);
        scene.add(rim);
        el.appendChild(renderer.domElement);
        renderer.domElement.setAttribute("aria-hidden", "true");
        const resize = () => {
          camera.aspect = el.clientWidth / Math.max(1, el.clientHeight);
          camera.updateProjectionMatrix();
          renderer.setSize(el.clientWidth, el.clientHeight);
          renderer.render(scene, camera);
        };
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(el);
        let px = 0,
          py = 0,
          visible = true,
          last = 0;
        const pointer = (e: PointerEvent) => {
          const b = el.getBoundingClientRect();
          px = ((e.clientX - b.left) / b.width - 0.5) * 0.35;
          py = ((e.clientY - b.top) / b.height - 0.5) * 0.25;
        };
        el.addEventListener("pointermove", pointer);
        const intersection = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        intersection.observe(el);
        const animate = (time: number) => {
          frame = requestAnimationFrame(animate);
          if (
            !running.current ||
            !visible ||
            document.hidden ||
            time - last < 33
          )
            return;
          last = time;
          group.rotation.y += (px - group.rotation.y) * 0.025;
          group.rotation.x += (py - group.rotation.x) * 0.025;
          core.rotation.y += 0.003;
          core.rotation.z += 0.0005;
          rings.forEach((ring, i) => (ring.rotation.z += 0.0006 * (i + 1)));
          renderer.render(scene, camera);
        };
        frame = requestAnimationFrame(animate);
        setReady(true);
        const motion = () => {
          if (reduced.matches) {
            running.current = false;
            setPaused(true);
          }
        };
        reduced.addEventListener("change", motion);
        cleanup = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          intersection.disconnect();
          el.removeEventListener("pointermove", pointer);
          reduced.removeEventListener("change", motion);
          scene.traverse((o) => {
            if (o instanceof T.Mesh) {
              o.geometry.dispose();
              const materials = Array.isArray(o.material)
                ? o.material
                : [o.material];
              materials.forEach((m) => m.dispose());
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {});
    return () => {
      disposed = true;
      cleanup();
    };
  }, [interactive]);
  return (
    <div className={"studio-orbit " + (ready ? "orbit-ready" : "")}>
      <img
        className="orbit-fallback"
        src="/media/studio-orbit.webp"
        alt="Graphite sculpture with luminous green orbital rings"
        fetchPriority="high"
      />
      <div ref={host} className="orbit-canvas" />
      <div className="orbit-caption">
        <span>
          ALWAYS IN ORBIT.
          <br />
          ALWAYS EXPLORING.
        </span>
        <div className="orbit-controls">
          <button
            className="orbit-mode"
            onClick={() => setInteractive(!interactive)}
          >
            <Cube size={16} /> {interactive ? "Artwork" : "Explore in 3D"}
          </button>
          {ready && (
            <button
              aria-label={
                paused ? "Resume sculpture motion" : "Pause sculpture motion"
              }
              onClick={() => {
                running.current = paused;
                setPaused(!paused);
              }}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
